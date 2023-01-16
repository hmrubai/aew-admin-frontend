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
    selector: 'app-aew-payment-list',
    templateUrl: './aew-payment-list.component.html',
    encapsulation: ViewEncapsulation.None
})

export class AEWPaymentListComponent implements OnInit {
    currentUser: any = null;
    entryForm: FormGroup;
    uploadForm: FormGroup;
    featureHistoryList: FormArray;
    featureFormArray: any;

    submitted = false;
    @BlockUI() blockUI: NgBlockUI;
    modalTitle = 'Add News';
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
            name: [null, [Validators.required, Validators.maxLength(550)]],
            email: [null, [Validators.required, Validators.maxLength(550)]],
            contact_no: [null, [Validators.maxLength(550)]],
            address: [null, [Validators.maxLength(550)]],
            institution: [null, [Validators.maxLength(550)]],
            education: [null, [Validators.maxLength(550)]],
            country_id: [null, [Validators.maxLength(550)]],
            school_id: [null, [Validators.maxLength(550)]],
            user_type: ['Expert', [Validators.maxLength(550)]],
            image: [null]
        });

        this.uploadForm = this.formBuilder.group({
            feature_thumbnail: ['']
        });

        this.getList();
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

    getList() {
        this.loadingIndicator = true;

        this._service.get('admin/payment-list').subscribe(res => {
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

        this.modalTitle = 'Update Expert Information';
        this.btnSaveText = 'Update';

        this.entryForm.controls['id'].setValue(item.id);
        this.entryForm.controls['name'].setValue(item.name);
        this.entryForm.controls['email'].setValue(item.email);
        this.entryForm.controls['email'].disable();
        this.entryForm.controls['contact_no'].setValue(item.contact_no);
        this.entryForm.controls['address'].setValue(item.address);
        this.entryForm.controls['institution'].setValue(item.institution);
        this.entryForm.controls['education'].setValue(item.education);
        // this.entryForm.controls['image'].setValue(item.image);
        this.entryForm.controls['country_id'].setValue(item.country_id);
        this.entryForm.controls['school_id'].setValue(item.school_id);
        this.entryForm.controls['user_type'].setValue(item.user_type);

        this.modalRef = this.modalService.show(template, this.modalConfig);
    }

    onFormSubmit() {
        this.submitted = true;
        if (this.entryForm.invalid) {
            return;
        }

        const formData = new FormData();
        if(this.uploadForm.get('feature_thumbnail').value){
            formData.append('file', this.uploadForm.get('feature_thumbnail').value);
        }

        this.entryForm.value.id ? this.blockUI.start('Saving...') : this.blockUI.start('Updating...');

        this.entryForm.controls['email'].enable();

        const obj = {
            id: this.entryForm.value.id ? this.entryForm.value.id : null,
            name: this.entryForm.value.name.trim(),
            email: this.entryForm.value.email.trim(),
            contact_no: this.entryForm.value.contact_no ? this.entryForm.value.contact_no.trim(): null,
            address: this.entryForm.value.address ? this.entryForm.value.address.trim(): null,
            institution: this.entryForm.value.institution ? this.entryForm.value.institution.trim(): null,
            education: this.entryForm.value.education ? this.entryForm.value.education.trim(): null,
            country_id: this.entryForm.value.country_id,
            school_id: this.entryForm.value.school_id,
            user_type: 'Expert'
        };

        formData.append('data', JSON.stringify(obj));

        this._service.post('admin/save-update-expert', formData).subscribe(
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
        this.entryForm.controls['email'].enable();
        this.modalRef.hide();
        this.submitted = false;
        this.modalTitle = 'Add New Expert';
        this.btnSaveText = 'Save';
    }

    openModal(template: TemplateRef<any>) {
        // this.entryForm.controls['is_active'].setValue(true);
        this.modalRef = this.modalService.show(template, this.modalConfig);
    }
}
