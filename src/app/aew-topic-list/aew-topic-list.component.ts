import { Component, TemplateRef, ViewChild, ElementRef, ViewEncapsulation, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../_services/common.service';
import { AuthenticationService } from '../_services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Page } from '../_models/page';
import { environment } from '../../environments/environment';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-aew-topic-list',
    templateUrl: './aew-topic-list.component.html',
    encapsulation: ViewEncapsulation.None
})

export class AEWTopicListComponent implements OnInit {
    currentUser: any = null;
    entryForm: FormGroup;
    uploadForm: FormGroup;
    featureHistoryList: FormArray;
    featureFormArray: any;

    submitted = false;
    @BlockUI() blockUI: NgBlockUI;
    modalTitle = 'Add New Topic';
    btnSaveText = 'Save';

    modalConfig: any = { class: 'gray modal-lg', backdrop: 'static' };
    modalRef: BsModalRef;

    page = new Page();
    rows = [];
    itemTypeList: Array<any> = [];
    coachingCenterList: Array<any> = [];
    loadingIndicator = false;
    ColumnMode = ColumnMode;

    countryList: Array<any> = [];
    packageType: Array<any> = [];
    categoryList: Array<any> = [];
    gradeList: Array<any> = [];
    schoolList: Array<any> = [];

    urls = [];
    files = [];

    scrollBarHorizontal = (window.innerWidth < 1200);
    baseUrl = environment.baseUrl;
    @ViewChild('dataTable') table: any;

    arrayBuffer: any;
    itemFile: File;
    itemUploadList: Array<any> = [];

    packagePrice = 0;

    constructor(
        private modalService: BsModalService,
        public formBuilder: FormBuilder,
        private _service: CommonService,
        private _authService: AuthenticationService,
        private toastr: ToastrService,
        private router: Router
    ) {
        window.onresize = () => {
            this.scrollBarHorizontal = (window.innerWidth < 1200);
        };
        this._authService.currentUserDetails.subscribe((value) => {
            this.currentUser = value;
        });
    }


    ngOnInit() {
        this.entryForm = this.formBuilder.group({
            id: [null],
            title: [null, [Validators.required, Validators.maxLength(550)]],
            hint: [null, [Validators.required, Validators.maxLength(550)]],
            country_id: [18],
            package_type_id: [null, [Validators.required]],
            catagory_id: [null, [Validators.required]],
            grade_id: [null],
            school_id: [null],
            limit: [100, [Validators.required]],
            is_active: [true],
        });

        this.uploadForm = this.formBuilder.group({
            feature_thumbnail: ['']
        });

        this.getCountryList();
        this.getPackageTypeList();
        this.getCategoryList();
        this.getGradeList();
        this.getSchoolList();

        this.getList();
        // this.getCoachingCenterList();
    }

    get f() {
        return this.entryForm.controls;
    }

    uploadItemFile(event) {
        this.packagePrice = 0;
        this.itemFile = event.target.files[0];
        let fileReader = new FileReader();
        fileReader.readAsArrayBuffer(this.itemFile);
        fileReader.onload = (e) => {
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, { type: "binary" });
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            const list = XLSX.utils.sheet_to_json(worksheet);
            this.itemUploadList = [];
            list.forEach((element, i) => {
                this.packagePrice += Number(element['unit_price']);
                this.itemUploadList.push({
                    bscs_item_id: element['id'],
                    unit_price: element['unit_price']
                })
            });
            console.log(this.itemUploadList)
            console.log(this.packagePrice)
            this.entryForm.controls['price_of_package'].setValue(this.packagePrice);
        }
    }

    onSelectFile(event) {
        this.urls = [];
        this.files = [];

        if (event.target.files.length > 0) {
            this.files = event.target.files[0];
            if (event.target.files[0].size > 2000000){
                this.toastr.error('File size is more then 2MB', 'Failed to changed!', { timeOut: 3000 });
                return;
            }else{
                this.uploadForm.get('feature_thumbnail').setValue(this.files);
            }
        }
    }

    getCountryList() {
        this._service.get('country-list').subscribe(res => {
            if (res.status == false) {
                this.toastr.error(res.message, 'Error!', { timeOut: 2000 });
                return;
            }
            this.countryList = res.data;
        }, err => { }
        );
    }

    getPackageTypeList() {
        this._service.get('syllabus-list').subscribe(res => {
            if (res.status == false) {
                this.toastr.error(res.message, 'Error!', { timeOut: 2000 });
                return;
            }
            this.packageType = res.data;
        }, err => { }
        );
    }

    getCategoryList() {
        this._service.get('category-list').subscribe(res => {
            if (res.status == false) {
                this.toastr.error(res.message, 'Error!', { timeOut: 2000 });
                return;
            }
            this.categoryList = res.data;
        }, err => { }
        );
    }

    getGradeList() {
        this._service.get('grade-list').subscribe(res => {
            if (res.status == false) {
                this.toastr.error(res.message, 'Error!', { timeOut: 2000 });
                return;
            }
            this.gradeList = res.data;
        }, err => { }
        );
    }

    getSchoolList() {
        this._service.get('school-list').subscribe(res => {
            if (res.status == false) {
                this.toastr.error(res.message, 'Error!', { timeOut: 2000 });
                return;
            }
            this.schoolList = res.data;
        }, err => { }
        );
    }

    getList() {
        this.loadingIndicator = true;

        this._service.get('admin/topic-list').subscribe(res => {
            if (res.status == false) {
                this.toastr.error(res.message, 'Error!', { timeOut: 2000 });
                return;
            }
            this.rows = res.data;
            setTimeout(() => {
                this.loadingIndicator = false;
            }, 1000);
        }, err => {
            this.toastr.error(err.message || err, 'Error!', { timeOut: 2000 });
            setTimeout(() => {
                this.loadingIndicator = false;
            }, 1000);
        }
        );
    }

    getItem(item, template: TemplateRef<any>) {

        this.modalTitle = 'Update Topic';
        this.btnSaveText = 'Update';

        this.entryForm.controls['id'].setValue(item.id);
        this.entryForm.controls['title'].setValue(item.title);
        this.entryForm.controls['hint'].setValue(item.hint);
        this.entryForm.controls['country_id'].setValue(item.country_id ? item.country_id : null);
        this.entryForm.controls['package_type_id'].setValue(item.syllabus_id ? item.syllabus_id : null);
        this.entryForm.controls['catagory_id'].setValue(item.catagory_id ? item.catagory_id : null);
        this.entryForm.controls['grade_id'].setValue(item.grade_id ? item.grade_id : null);
        this.entryForm.controls['school_id'].setValue(item.school_id ? item.school_id : null);
        this.entryForm.controls['limit'].setValue(item.limit);
        this.entryForm.controls['is_active'].setValue(item.is_active);

        this.modalRef = this.modalService.show(template, this.modalConfig);
    }

    onFormSubmit() {
        this.submitted = true;
        if (this.entryForm.invalid) {
            return;
        }

        const formData = new FormData();
        // if(this.uploadForm.get('feature_thumbnail').value){
        //     formData.append('file', this.uploadForm.get('feature_thumbnail').value);
        // }

        this.entryForm.value.id ? this.blockUI.start('Saving...') : this.blockUI.start('Updating...');

        const obj = {
            id: this.entryForm.value.id ? this.entryForm.value.id : null,
            title: this.entryForm.value.title.trim(),
            hint: this.entryForm.value.hint ? this.entryForm.value.hint.trim() : null,
            country_id: this.entryForm.value.country_id,
            package_type_id: this.entryForm.value.package_type_id,
            catagory_id: this.entryForm.value.catagory_id,
            grade_id: this.entryForm.value.grade_id,
            school_id: this.entryForm.value.school_id,
            limit: this.entryForm.value.limit,
            is_active: this.entryForm.value.is_active
        };

        formData.append('data', JSON.stringify(obj));

        this._service.post('admin/topic-save-or-update', formData).subscribe(
            data => {
                this.blockUI.stop();
                if (data.status == true) {
                    this.toastr.success(data.message, 'Success!', { timeOut: 2000 });
                    this.modalHide();
                    this.getList();

                } else {
                    this.toastr.error(data.message, 'Error!', { timeOut: 2000 });
                }
            },
            err => {
                this.blockUI.stop();
                this.toastr.error(err.message || err, 'Error!', { timeOut: 2000 });
            }
        );
    }

    toggleExpandRow(row) {
        this.table.rowDetail.toggleExpandRow(row);
    }

    modalHide() {
        this.entryForm.reset();
        this.modalRef.hide();
        this.submitted = false;
        this.modalTitle = 'Add New Topic';
        this.btnSaveText = 'Save';
        this.packagePrice = 0;
    }

    openModal(template: TemplateRef<any>) {
        this.entryForm.controls['is_active'].setValue(true);
        this.modalRef = this.modalService.show(template, this.modalConfig);
    }
}
