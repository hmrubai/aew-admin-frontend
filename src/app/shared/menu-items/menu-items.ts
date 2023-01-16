import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'Dashboard',
    main: [
      {
        state: 'dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'icofont-dashboard',
        permission: 'LocalAdmin'
      },
      {
        state: 'aew-package-type',
        name: 'Syllabus',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },

      {
        state: 'aew-grade-list',
        name: 'Grade List',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'aew-category-list',
        name: 'Category List',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'aew-package-list',
        name: 'Package List',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'aew-news-list',
        name: 'Promotional News List',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'aew-topic-list',
        name: 'Topic List',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'aew-payment-list',
        name: 'Payment List',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'aew-expert-list',
        name: 'Expert List',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'school-list',
        name: 'School List',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      

      

      /*
      {
        state: 'beat-correction-summary',
        name: 'AEW Correction',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'beat-payment-list',
        name: 'AEW Payments',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'beat-purchase-list',
        name: 'AEW Purchases',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'beat-collaborator-list',
        name: 'AEW Collaboration',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin,sewCollaborator'
      },
      {
        state: 'admission-test',
        name: 'Admission Test',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'virtual-class-connection',
        name: 'Virtual Class Connection',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'virtual-class-duration',
        name: 'BacBon Virtual Class',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'virtual-class-history',
        name: 'Bacbon Virtual Class History',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'virtual-class-dashboard',
        name: 'Coach Calling (Chart)',
        type: 'link',
        param:13,
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'virtual-class-dashboard',
        name: 'Virtual Class (Phase 6)',
        type: 'link',
        param:8,
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'external-virtual-class-history',
        name: 'Virtual Class History',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'assesment-list',
        name: 'Assesments',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'member-list',
        name: 'Members',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'job-list',
        name: 'Jobs',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'applied-job-list',
        name: 'Applied Job List',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'career-applied-list',
        name: 'Career Applied List',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'recruitment-exams',
        name: 'Recruitment Exams',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'recruitment-exam-questions',
        name: 'Recruitment Question Bank',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'complain-ticket-list',
        name: 'Complain Tickets',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'guardian-complain-ticket',
        name: 'Guardian Tickets',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'student-complain-ticket',
        name: 'Student Tickets',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'promotions',
        name: 'Promotions',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'course',
        name: 'Course',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'class',
        name: 'Class',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'student-institute',
        name: 'Student Institute',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'entrance-quiz',
        name: 'Quiz',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'cognitive',
        name: 'Cognitve Questions',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },
      {
        state: 'post-list',
        name: 'Posts',
        type: 'link',
        icon: 'ti-control-forward',
        permission: 'LocalAdmin'
      },*/
    ]
  },
  // /*{
  //   label: 'Screening Test',
  //   main: [
  //     {
  //       state: 'screening-test',
  //       name: 'Screening Test',
  //       type: 'sub',
  //       icon: 'ti-control-forward',
  //       permission: 'Admin,SuperAdmin',
  //       children: [
  //         {
  //           state: 'screening-test-list',
  //           name: 'Screening Test List',
  //           icon: 'ti-control-forward'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   label: 'AEW Settings',
  //   main: [
  //     {
  //       state: 'beat',
  //       name: 'AEW Correction',
  //       type: 'sub',
  //       icon: 'ti-control-forward',
  //       permission: 'LocalAdmin',
  //       children: [
  //         {
  //           state: 'beat-item-type',
  //           name: 'AEW Item Type',
  //           icon: 'ti-control-forward'
  //         },
  //         {
  //           state: 'beat-package-list',
  //           name: 'AEW Packages',
  //           icon: 'ti-control-forward'
  //         },
  //         {
  //           state: 'beat-item-list',
  //           name: 'AEW Items',
  //           icon: 'ti-control-forward'
  //         },
  //         {
  //           state: 'beat-coaching-center',
  //           name: 'AEW Coaching Certer',
  //           icon: 'ti-control-forward',
  //         },
  //         {
  //           state: 'beat-coaching-center-member-list',
  //           name: 'Coaching Certer Members',
  //           icon: 'ti-control-forward',
  //         },
  //         {
  //           state: 'aew-collaborator-list',
  //           name: 'AEW Collaborator List',
  //           icon: 'ti-control-forward'
  //         },
  //         {
  //           state: 'beat-promo-list',
  //           name: 'AEW Promo Items',
  //           icon: 'ti-control-forward'
  //         },
  //       ]
  //     }
  //   ]
  // },*/

  // /*{
  //   label: 'BSCS',
  //   main: [

  //     {
  //       state: 'bscs',
  //       name: 'BSCS Correction',
  //       type: 'sub',
  //       icon: 'ti-control-forward',
  //       children: [
  //         {
  //           state: 'institute-list',
  //           name: 'Institute',
  //           icon: 'ti-control-forward'
  //         },
  //         {
  //           state: 'institute-member-list',
  //           name: 'Institute Member',
  //           icon: 'ti-control-forward'
  //         },
  //         {
  //           state: 'institute-batch-list',
  //           name: 'Batch',
  //           icon: 'ti-control-forward'
  //         },
  //         {
  //           state: 'batch-student',
  //           name: 'Batch Students',
  //           icon: 'ti-control-forward'
  //         },
  //         {
  //           state: 'item-list',
  //           name: 'BSCS Item',
  //           icon: 'ti-control-forward'
  //         },
  //         {
  //           state: 'package-list',
  //           name: 'Packages',
  //           icon: 'ti-control-forward'
  //         },
  //         {
  //           state: 'package-assign',
  //           name: 'Package Assign',
  //           icon: 'ti-control-forward'
  //         },
  //         {
  //           state: 'bill-list',
  //           name: 'Bills',
  //           icon: 'ti-control-forward'
  //         },
  //         {
  //           state: 'payment-list',
  //           name: 'Payments',
  //           icon: 'ti-control-forward'
  //         },
  //         {
  //           state: 'item-assign',
  //           name: 'Item Assign',
  //           icon: 'ti-control-forward'
  //         },
  //         {
  //           state: 'consumption-list',
  //           name: 'Consumptions',
  //           icon: 'ti-control-forward'
  //         },

  //       ]
  //     }
  //   ]
  // },*/
  // {
  //   label: 'Configurations',
  //   main: [
  //     {
  //       state: 'blood-request-con',
  //       name: 'Blood Request',
  //       type: 'link',
  //       icon: 'ti-control-forward',
  //       permission: 'LocalAdmin',
  //     }

  //   ]
  // },
  // {
  //   label: 'Upload Contenst',
  //   permission: 'LocalAdmin',
  //   main: [
  //     /*{
  //       state: 'script-upload',
  //       name: 'Upload Script',
  //       type: 'link',
  //       icon: 'ti-control-forward',
  //       permission: 'LocalAdmin'
  //     },
  //     {
  //       state: 'video-list',
  //       name: 'Upload Video',
  //       type: 'link',
  //       icon: 'ti-control-forward',
  //       permission: 'LocalAdmin'
  //     },
  //     {
  //       state: 'quiz-list',
  //       name: 'Upload Quiz',
  //       type: 'link',
  //       icon: 'ti-control-forward',
  //       permission: 'LocalAdmin'
  //     },
  //     {
  //       state: 'question-list',
  //       name: 'Quiz Question List',
  //       type: 'link',
  //       icon: 'ti-control-forward',
  //       permission: 'LocalAdmin'
  //     },*/
  //     // {
  //     //   state: 'check-inout',
  //     //   name: 'Check In/Out',
  //     //   type: 'link',room-cleaning
  //     //   icon: 'ti-control-forward',
  //     //   permission: 'LocalAdmin'
  //     // },
  //     /*{
  //       state: 'payment',
  //       name: 'Payments',
  //       type: 'link',
  //       icon: 'ti-control-forward',
  //       permission: 'LocalAdmin'
  //     },
  //     {
  //       state: 'room-cleaning',
  //       name: 'Room Cleaning',
  //       type: 'link',
  //       icon: 'ti-control-forward',
  //       permission: 'LocalAdmin'
  //     }*/

  //   ]
  // },
  // {
  //   label: 'User Management',
  //   permission: 'LocalAdmin',
  //   main: [
  //     /*{
  //       state: 'teacher-list',
  //       name: 'Teacher List',
  //       type: 'link',
  //       icon: 'ti-control-forward',
  //       permission: 'LocalAdmin'
  //     },
  //     {
  //       state: 'student-list',
  //       name: 'Student List',
  //       type: 'link',
  //       icon: 'ti-control-forward',
  //       permission: 'LocalAdmin'
  //     },
  //     {
  //       state: 'request-list',
  //       name: 'Instructor Request',
  //       type: 'link',
  //       icon: 'ti-control-forward',
  //       permission: 'LocalAdmin'
  //     },
  //     /*{
  //       state: 'question-list',
  //       name: 'Quiz Question List',
  //       type: 'link',
  //       icon: 'ti-control-forward',
  //       permission: 'LocalAdmin'
  //     },*/

  //   ]
  // }

];

@Injectable()
export class MenuItems {
  private menu: Array<any> = MENUITEMS;
  getAll(): Menu[] {
    return this.menu;
  }

  refreshMenu(): void {
    this.menu = [];
    this.menu = MENUITEMS;
  }
  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}
