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
    selector: 'app-aew-package-list',
    templateUrl: './aew-package-list.component.html',
    encapsulation: ViewEncapsulation.None
})

export class AEWPackageListComponent implements OnInit {
    currentUser: any = null;
    entryForm: FormGroup;
    uploadForm: FormGroup;
    featureHistoryList: FormArray;
    featureFormArray: any;

    submitted = false;
    @BlockUI() blockUI: NgBlockUI;
    modalTitle = 'Create Package';
    btnSaveText = 'Save';

    modalConfig: any = { class: 'gray modal-lg', backdrop: 'static' };
    modalRef: BsModalRef;

    page = new Page();
    rows = [];
    itemTypeList: Array<any> = [];
    coachingCenterList: Array<any> = [];
    loadingIndicator = false;
    ColumnMode = ColumnMode;

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
            project_id: [10],
            title: [null, [Validators.required, Validators.maxLength(550)]],
            description: [null, [Validators.required, Validators.maxLength(550)]],
            promotion_title: [null, [Validators.maxLength(550)]],
            promotion_details: [null, [Validators.maxLength(550)]],
            feature_images: [null],
            limit: [0, [Validators.required]],
            cycle: [0, [Validators.required]],
            is_active: [true],
            created_by: [this.currentUser.id]
        });

        this.uploadForm = this.formBuilder.group({
            feature_thumbnail: ['']
        });

        // this.featureHistoryList = this.entryForm.get('features') as FormArray;
        // this.featureFormArray = this.entryForm.get('features')['controls'];

        this.getList();
        // this.getCoachingCenterList();
    }

    get f() {
        return this.entryForm.controls;
    }

    get f_his(): FormArray {
        return this.entryForm.get('features') as FormArray;
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

    /*** Feature  **/
    initFeatureHistory() {
        return this.formBuilder.group({
            feature_name: [null, [Validators.required]]
        });
    }

    addFeatureHistory() {
        this.featureHistoryList.push(this.initFeatureHistory());
    }

    removeFeatureHistory(i) {
        if (this.featureHistoryList.length > 1) {
            this.featureHistoryList.removeAt(i);
        }
    }


    getCoachingCenterList() {
        this._service.get('beat/coaching-center/get-dropdown-list').subscribe(res => {
            if (res.status != 'Ok') {
                this.toastr.error(res.message, 'Error!', { timeOut: 2000 });
                return;
            }
            this.coachingCenterList = res.result;
        }, err => { }
        );
    }

    getItemTypeList() {
        this._service.get('bscs/type/list').subscribe(res => {
            if (res.status != 'Ok') {
                this.toastr.error(res.message, 'Error!', { timeOut: 2000 });
                return;
            }
            this.itemTypeList = res.result;
        }, err => { }
        );
    }

    getList() {
        this.loadingIndicator = true;

        this._service.get('admin/package-list').subscribe(res => {
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

        this.modalTitle = 'Update Package';
        this.btnSaveText = 'Update';

        this.entryForm.controls['id'].setValue(item.id);
        this.entryForm.controls['title'].setValue(item.title);
        this.entryForm.controls['description'].setValue(item.description);
        this.entryForm.controls['promotion_title'].setValue(item.promotion_title);
        this.entryForm.controls['promotion_details'].setValue(item.promotion_details);
        this.entryForm.controls['limit'].setValue(item.limit);
        this.entryForm.controls['cycle'].setValue(item.cycle);
        this.entryForm.controls['is_active'].setValue(item.is_active);

        //item.features
        //features: this.formBuilder.array([this.initFeatureHistory()]),

        // console.log(item.features);

        // if (item.features) {
        //     let control = <FormArray>this.entryForm.controls.features;
        //     while (control.length !== 0) {
        //       control.removeAt(0);
        //     }
        //     item.features.forEach(x => {
        //       control.push(this.formBuilder.group({
        //         feature_name: new FormControl(x.name),
        //        }));
        //     });
        //   }

        // item.features.forEach(element => {
        //     this.featureHistoryList.push(element.name);
        // });

        this.modalRef = this.modalService.show(template, this.modalConfig);
    }

    onFormSubmit() {
        this.submitted = true;
        if (this.entryForm.invalid) {
            return;
        }

        // let features = [];
        // this.featureHistoryList.value.forEach((element, key) => {
        //     if (element.feature_name == null) {
        //         this.featureHistoryList.removeAt(key);
        //     }
        //     else {
        //         features.push(element.feature_name);
        //     }
        // });

        const formData = new FormData();
        if(this.uploadForm.get('feature_thumbnail').value){
            formData.append('file', this.uploadForm.get('feature_thumbnail').value);
        }

        this.entryForm.value.id ? this.blockUI.start('Saving...') : this.blockUI.start('Updating...');

        const obj = {
            id: this.entryForm.value.id ? this.entryForm.value.id : null,
            title: this.entryForm.value.title.trim(),
            description: this.entryForm.value.description.trim(),
            promotion_title: this.entryForm.value.promotion_title,
            promotion_details: this.entryForm.value.promotion_details,
            limit: this.entryForm.value.limit,
            cycle: this.entryForm.value.cycle,
            is_active: this.entryForm.value.is_active
        };

        formData.append('data', JSON.stringify(obj));

        this._service.post('admin/package-save-or-update', formData).subscribe(
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
        //console.log('Toggled Expand Row!', row);
        this.table.rowDetail.toggleExpandRow(row);
    }

    modalHide() {
        this.entryForm.reset();
        this.modalRef.hide();
        // let control = <FormArray>this.entryForm.controls.features;
        // while (control.length !== 0) {
        //     control.removeAt(0);
        // }
        // this.addFeatureHistory();
        this.submitted = false;
        this.modalTitle = 'Add New Package';
        this.btnSaveText = 'Save';
        //this.packagePrice = 0;
    }

    openModal(template: TemplateRef<any>) {
        this.entryForm.controls['is_active'].setValue(true);
        this.modalRef = this.modalService.show(template, this.modalConfig);
    }
}
