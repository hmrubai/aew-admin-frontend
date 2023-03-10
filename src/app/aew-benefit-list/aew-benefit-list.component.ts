import { Component, TemplateRef, ViewChild, ElementRef, ViewEncapsulation, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ConfirmService } from '../_helpers/confirm-dialog/confirm.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../_services/common.service';
import { AuthenticationService } from '../_services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Page } from '../_models/page';
import { environment } from '../../environments/environment';
import { Location } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-aew-benefit-list',
    templateUrl: './aew-benefit-list.component.html',
    encapsulation: ViewEncapsulation.None
})

export class PackageBenefitListComponent implements OnInit {
    currentUser: any = null;
    entryForm: FormGroup;
    uploadForm: FormGroup;
    featureHistoryList: FormArray;
    featureFormArray: any;

    submitted = false;
    @BlockUI() blockUI: NgBlockUI;
    modalTitle = 'Add New Package';
    btnSaveText = 'Save';

    modalConfig: any = { class: 'gray modal-lg', backdrop: 'static' };
    modalRef: BsModalRef;

    page = new Page();
    rows = [];
    itemTypeList: Array<any> = [];
    loadingIndicator = false;
    ColumnMode = ColumnMode;

    urls = [];
    files = [];

    file: File;
    arrayBuffer: any;
    filelist: any;
    packageDetails;
    is_loaded = false;

    importedData:any;
    dataImported = false;

    scrollBarHorizontal = (window.innerWidth < 1200);
    baseUrl = environment.baseUrl;
    @ViewChild('dataTable') table: any;

    packageId;

    itemFile: File;
    itemUploadList: Array<any> = [];

    packagePrice = 0;

    constructor(
        private modalService: BsModalService,
        public formBuilder: FormBuilder,
        private _service: CommonService,
        private _authService: AuthenticationService,
        private confirmService: ConfirmService,
        private routerLocation: Location,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        // this.page.pageNumber = 0;
        // this.page.size = 10;
        window.onresize = () => {
            this.scrollBarHorizontal = (window.innerWidth < 1200);
        };
        this._authService.currentUserDetails.subscribe((value) => {
            this.currentUser = value;
        });
        this.packageId = this.route.snapshot.paramMap.get("package_id");
    }

    ngOnInit() {
        this.entryForm = this.formBuilder.group({
            id: [null],
            package_id: [null],
            benefit: [null, [Validators.required, Validators.maxLength(550)]],
        });

        this.entryForm.controls['package_id'].setValue(this.packageId);

        this.uploadForm = this.formBuilder.group({
            feature_thumbnail: ['']
        });

        this.getPackageDetails();
    }

    get f() {
        return this.entryForm.controls;
    }

    addfile(event) {
        this.file = event.target.files[0];
        let fileReader = new FileReader();
        fileReader.readAsArrayBuffer(this.file);
        fileReader.onload = (e) => {
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, { type: "binary" });
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            this.importedData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
            this.dataImported = true;
            this.filelist = this.file;
            console.log(this.importedData)
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

    getPackageDetails() {
        this._service.get('package-details-by-id/' + this.packageId).subscribe(res => {
            if (res.status == false) {
                this.toastr.error(res.message, 'Error!', { timeOut: 2000 });
                return;
            }
            this.packageDetails = res.data;
            this.rows = res.data.benefits;
            this.is_loaded = true;
        }, err => { }
        );
    }

    getItem(item, template: TemplateRef<any>) {
        this.modalTitle = 'Update Benefit';
        this.btnSaveText = 'Update';
        this.entryForm.controls['id'].setValue(item.id);
        this.entryForm.controls['benefit'].setValue(item.benefit);
        this.modalRef = this.modalService.show(template, this.modalConfig);
    }

    onFormSubmit() {
        this.submitted = true;
        if (this.entryForm.invalid) {
            return;
        }

        this.entryForm.value.id ? this.blockUI.start('Saving...') : this.blockUI.start('Updating...');

        const obj = {
            id: this.entryForm.value.id ? this.entryForm.value.id : null,
            package_id: this.packageId,
            benefit: this.entryForm.value.benefit.trim()
        };

        this._service.post('admin/benefit-save-or-update', obj).subscribe(
            data => {
                this.blockUI.stop();
                if (data.status == true) {
                    this.toastr.success(data.message, 'Success!', { timeOut: 2000 });
                    this.modalHide();
                    this.getPackageDetails();

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

    deleteBenefit(benefit){
        let params = {
            id: benefit.id,
        }

        this.confirmService.confirm('Are you sure?', 'Do you want to delete?')
            .subscribe(
                result => {
                    if (result) {
                        this.blockUI.start('Deleting...');
                        this._service.post('admin/benefit-delete', params).subscribe(res => {
                            this.toastr.success(res.message, 'Successful!');
                            this.getPackageDetails();
                            this.blockUI.stop();
                        }, err => {
                            this.blockUI.stop();
                        });
                    }
                }
            );
    }


    toggleExpandRow(row) {
        console.log('Toggled Expand Row!', row);
        this.table.rowDetail.toggleExpandRow(row);
    }

    modalHide() {
        this.entryForm.reset();
        this.uploadForm.reset();
        this.modalRef.hide();
        this.submitted = false;
        this.modalTitle = 'Add Benefit';
        this.btnSaveText = 'Save';
        this.packagePrice = 0;
    }

    openModal(template: TemplateRef<any>) {
        this.entryForm.controls['package_id'].setValue(this.packageId);
        this.modalRef = this.modalService.show(template, this.modalConfig);
    }

    backToLocation(){
        this.routerLocation.back();
    }
}
