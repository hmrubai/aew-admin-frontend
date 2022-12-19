import { Component, TemplateRef, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from './../_services/authentication.service';
import { CommonService } from './../_services/common.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import * as moment from 'moment';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {

    public currentUser: any;
    public allContent: any;
    public buildingWiseRooms: any;
    public allocationRoomDetails: any;
    public floorRooms: any;
    approvedTutor : Number=0;
    pendingTutor : Number=0;
    holdTutor : Number=0;
    suspendTutor : Number=0;
    guardian : Number=0;
    hiredTutor : Number=0;
    submitted = false;

    searchForm: FormGroup;

    modalConfig: any = { class: 'gray modal-xl', backdrop: 'static' };
    modalRef: BsModalRef;


    modalTitle = 'Allocation Details';
    btnSaveText = 'Close';

    imgBaseUrl = environment.baseUrl;

    getMonthlyPayment = [];
    courseOptions: any = null;
    @BlockUI() blockUI: NgBlockUI;
    printableCollections = 0;
    constructor(
        private authService: AuthenticationService,
        private modalService: BsModalService,
        private toastr: ToastrService,
        private router: Router,
        public formBuilder: FormBuilder,
        private _service: CommonService
    ) {
        this.currentUser = this.authService.currentUserDetails.value;
        //console.log(this.currentUser)
    }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            Date: [new Date()],
        });

        // this.bsConfig = {
        //     minDate: new Date()
        // }

          //this.getCounts();
        // this.getMonthlyIncome();
        // this.getBuildingWiseRooms();
    }

    get f() {
        return this.searchForm.controls;
    }

    getCounts() {
        this._service.get('/getUsersNumber').subscribe(res => {

           this.approvedTutor = res.tutorApprovedNumber;
           this.pendingTutor = res.tutorPendingNumber;
           this.holdTutor = res.tutorOnHoldNumber;
           this.suspendTutor = res.tutorSuspendedNumber;
           this.guardian = res.guardianNumber;
           this.hiredTutor = res.hiredTutorNumber;
        }, err => {
           this.toastr.warning(err.Messaage || err, 'Warning!', { closeButton: true, disableTimeOut: false });
        }
        );
     }

    downloadExcelFile() {

        this.blockUI.start('Generating report. Please wait...');
        this._service.downloadFile('Course/GetCourseEnrollmentCountExcel').subscribe(res => {
            this.blockUI.stop();
            const url = window.URL.createObjectURL(res);
            var link = document.createElement('a');
            link.href = url;
            link.download = "Course_Wise_Enrolled_Employees_Report.xlsx";
            link.click();

        },
            error => {
                this.blockUI.stop();
            });
    }

    fixDate(d: Date): Date {
        d.setHours(d.getHours() - d.getTimezoneOffset() / 60);
        return d;
    }

    getDateTimeFormat(value:Date){
        return moment(value).format('DD-MMM-YYYY hh:mm A');
    }

    modalHide() {
        this.modalRef.hide();
    }

    openModal(room, template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, this.modalConfig);
    }
}
