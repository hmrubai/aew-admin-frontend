import { Component, TemplateRef, ViewChild, ElementRef, ViewEncapsulation, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../_services/common.service';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Page } from '../_models/page';
import { environment } from '../../environments/environment';


@Component({
    selector: 'app-aew-category-list',
    templateUrl: './aew-category-list.component.html',
    encapsulation: ViewEncapsulation.None
})

export class AEWCategoryListComponent implements OnInit {

    entryForm: FormGroup;
    submitted = false;
    @BlockUI() blockUI: NgBlockUI;
    modalTitle = 'Add Category';
    btnSaveText = 'Save';

    modalConfig: any = { class: 'gray modal-lg', backdrop: 'static' };
    modalRef: BsModalRef;

    page = new Page();
    rows = [];
    itemTypeList: Array<any> = [];
    loadingIndicator = false;
    ColumnMode = ColumnMode;

    scrollBarHorizontal = (window.innerWidth < 1200);
    baseUrl = environment.baseUrl;

    selectedInstitute;
    constructor(
        private modalService: BsModalService,
        public formBuilder: FormBuilder,
        private _service: CommonService,
        private toastr: ToastrService,
        private router: Router
    ) {
        // this.page.pageNumber = 0;
        // this.page.size = 10;
        window.onresize = () => {
            this.scrollBarHorizontal = (window.innerWidth < 1200);
        };
    }


    ngOnInit() {
        this.entryForm = this.formBuilder.group({
            id: [null],
            name: [null, [Validators.required, Validators.maxLength(550)]],
            is_active: [true]
        });

        this.getGradeList();
    }

    get f() {
        return this.entryForm.controls;
    }

    getGradeList() {
        this._service.get('admin/category-list').subscribe(res => {
            if (res.status == false) {
                this.toastr.error(res.message, 'Error!', { timeOut: 2000 });
                return;
            }
            this.itemTypeList = res.data;
        }, err => { }
        );
    }

    getItem(item, template: TemplateRef<any>) {
        this.modalTitle = 'Update Category';
        this.btnSaveText = 'Update';
        this.entryForm.controls['id'].setValue(item.id);
        this.entryForm.controls['name'].setValue(item.name);
        this.entryForm.controls['is_active'].setValue(item.is_active);
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
            name: this.entryForm.value.name.trim(),
            is_active: this.entryForm.value.is_active
        };

        this._service.post('admin/category-save-or-update', obj).subscribe(
            data => {
                this.blockUI.stop();
                if (data.status == true) {
                    this.toastr.success(data.message, 'Success!', { timeOut: 2000 });
                    this.modalHide();
                    this.getGradeList();
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

    modalHide() {
        this.entryForm.reset();
        this.modalRef.hide();
        this.submitted = false;
        this.modalTitle = 'Add Category';
        this.btnSaveText = 'Save';
    }

    openModal(template: TemplateRef<any>) {
        this.modalTitle = 'Add Category';
        this.entryForm.controls['is_active'].setValue(true);
        this.modalRef = this.modalService.show(template, this.modalConfig);
    }
}
