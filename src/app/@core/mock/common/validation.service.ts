import {Injectable} from '@angular/core';
@Injectable({providedIn: 'root'})
export class ValidationService {
    constructor() {}
    validationForm(error): string[] {
        const message = [];
        // message.push(error.error.error.details[0].path)  ;
        if (error.error.error.details) {

            if (error.error.error.details.messages) {
                if (error.error.error.details.messages.tel) {
                    message.push('Phone Can\'t Be Blank ');
                }
                if (error.error.error.details.messages.cabinet_short_desc) {
                    message.push('Short Description Can\'t Be Blank ');
                }
                if (error.error.error.details.messages.domiciliation) {
                    message.push('Domiciliation Is Required');
                }
                if (error.error.error.details.messages.legal_name) {
                    message.push('Legal Name Is Required');
                }
                if (error.error.error.details.messages.cabinet_ref) {
                    message.push('NIF Is Required');
                }
                if (error.error.error.details.messages.category) {
                    message.push('Category Is Required');
                }
                if (error.error.error.details.messages.first_name) {
                    message.push('First Name Can\'t Be Blank ');
                }
                if (error.error.error.details.messages.last_name) {
                    message.push('Last Name Can\'t Be Blank ');
                }
                if (error.error.error.details.messages.address) {
                    message.push('Address Can\'t Be Blank ');
                }
                if (error.error.error.details.messages.mobile) {
                    message.push('Mobile Can\'t Be Blank ');
                }
                if (error.error.error.details.messages.bar_name) {
                    message.push('Bar Name Can\'t Be Blank ');
                }
                if (error.error.error.details.messages.license_num) {
                    message.push('License Number Can\'t Be Blank ');
                }
                if (error.error.error.details.messages.category_hist ) {
                    message.push('Category Historical Can\'t Be Blank');
                }
                if (error.error.error.details.messages.bar_role_hist) {
                    message.push('Bar Role Historical Can\'t Be Blank ');
                }
                if (error.error.error.details.messages.role_cabinet_hist) {
                    message.push('Role Cabinet Historical Can\'t Be Blank ');
                }
            } else {
                for ( let i = 0 ; i < error.error.error.details.length ; i++) {
                    switch (error.error.error.details[i].path) {
                        case ('/join_date'): {
                            message.push('Join Date Should Match Format date-time')  ;
                            break;
                        }
                        case ('/license_end_date'): {
                            message.push('License End Date Should Match Format date-time')  ;
                            break;
                        }
                        case ('/bundle_edate'): {
                            message.push('End Date Is Required')  ;
                            break;
                        }
                        case ('/bundle_sdate'): {
                            message.push('Start  Date Is Required')  ;
                            break;
                        }
                        case ('/quantity_max'): {
                            message.push('Quantity Max Is Required')  ;
                            break;
                        }
                        case ('/plan_price'): {
                            message.push('Plan Price Is Required')  ;
                            break;
                        }  case ('/nbmonths'): {
                            message.push('Number Of Months Is Required')  ;
                            break;
                        }
                        case ('/grace_period'): {
                            message.push('Grace Period Should Be Number')  ;
                            break;
                        }
                        case ('/discount'): {
                            message.push('Discount Should Be Number')  ;
                            break;
                        }
                        case ('/quantity'): {
                            message.push('Quantity Is Required')  ;
                            break;
                        }
                        case ('/payment_date'): {
                            message.push('Payment Date is Required')  ;
                            break;
                        }
                        case ('/roles/0'): {
                            message.push('Role Should be String')  ;
                            break;
                        }
                        case ('/category'): {
                            message.push('Category Historical Can\'t Be Blank ')  ;
                            break;
                        }
                        case ('/role_cabinet'): {
                            message.push('Role Cabinet Historical Can\'t Be Blank')  ;
                            break;
                        }
                    }
                }
            }
        } else {
            message.push(error.error.error.message);
        }
        return  message ;
    }
    validationCreateLawyer(Data): string[] {
        const Errors = [] ;
        if (Data.cabinet_role_hist[0].role === '') {
            Errors.push('Role In Cabinet Role Historical Can \'t be Blank');
        }
        if (Data.cabinet_role_hist[0].role_date === '') {
            Errors.push('Date In  Cabinet Role Historical Can \'t be Blank');
        }
        if (Data.password.length < 8) {
            Errors.push('The Password Should be at least 8 characters long ');
        }
        if (Data.email === '') {
            Errors.push('Email Can \'t be Blank');
        }
        if (Data.first_name === '') {
            Errors.push('First Name Can \'t be Blank');
        }
        if (Data.last_name === '') {
            Errors.push('Last Name Can \'t be Blank');
        }
        if (Data.address === '') {
            Errors.push('Address Can \'t be Blank');
        }
        if (Data.mobile === '') {
            Errors.push('Mobile Can \'t be Blank');
        }
        if (Data.license_num === '') {
            Errors.push('License Number Can \'t be Blank');
        }
        if (Data.join_date === 'T00:00:00.000Z') {
            Errors.push('join_date Can \'t be Blank');
        }
        if (Data.license_end_date === 'T00:00:00.000Z') {
            Errors.push('License End Date Can \'t be Blank');
        }
        if (Data.bar_role_hist[0].bar_name === '') {
            Errors.push('Bar Name In Bar Role Historical Can \'t be Blank');
        }
        if (Data.bar_role_hist[0].bar_role === '') {
            Errors.push('Bar Role In Bar Role Historical Can \'t be Blank');
        }
        if (Data.bar_role_hist[0].role_date === '') {
            Errors.push('Date In Bar Role Historical Can \'t be Blank');
        }
        if (Data.category_hist[0].category === '') {
            Errors.push('Category  In Category Historical Can \'t be Blank');
        }
        if (Data.category_hist[0].cat_date === '') {
            Errors.push('Date In Category Historical Can \'t be Blank');
        }
        return Errors ;
    }
    validationCreateBundle(Data): string[] {
        const Errors = [];
        if (Data.nbmonths === '') {
            Errors.push('Number Of Months Can \'t be Blank');
        }
        if (Data.bundle_name === '') {
            Errors.push('Name Of Bundle Can \'t be Blank');
        }
        if (Data.plan_price === '') {
            Errors.push('Plan Price Can \'t be Blank');
        }
        if (Data.bundle_sdate === 'T00:00:00.000Z') {
            Errors.push('Start Date Can \'t be Blank');
        }
        if (Data.bundle_edate === 'T00:00:00.000Z') {
            Errors.push('End Date Can \'t be Blank');
        }
        if (Data.quantity_max === '') {
            Errors.push('Quantity Max Can \'t be Blank');
        }
        return Errors ;
    }
    validationCreateCategory(Data): string[] {
        const Errors = [];
        if (Data.category === '') {
            Errors.push('Category Can \'t be Blank');
        }
        if (Data.discount === '') {
            Errors.push('Discount Can \'t be Blank');
        }
        if (Data.grace_period === '') {
            Errors.push('Grace Period Can \'t be Blank');
        }
        return Errors ;
    }
    validationCreateCabinet(Data): string[] {
        const Errors = [];
        if (Data.legal_name === '') {
            Errors.push('Legal Name Can \'t be Blank');
        }
        if (Data.wilaya_code === undefined ) {
            Errors.push(' Wilaya Can \'t be Blank');
        }
        if (Data.join_date === 'T00:00:00.000Z') {
            Errors.push('Join Date Can\'t Be Blank ');
        }
        if (Data.nif === '') {
            Errors.push(' NIF Can \'t be Blank');
        }
        if (Data.domiciliation === '') {
            Errors.push('Domiciliation Can \'t be Blank');
        }
        if (Data.email === '') {
            Errors.push('Email Can\'t Be Blank ');
        }
        if (Data.tel.length === 0) {
            Errors.push('Phone Can\'t Be Blank ');
        }
        if (Data.cabinet_short_desc === '') {
            Errors.push('Short Description Can\'t Be Blank ');
        }
        return Errors ;
    }
    validationCreateMembership(Data): string[] {
        const Errors = [];
        if (Data.bundle_id == null) {
            Errors.push('Bundle Reference Can \'t be Blank');
        }
        if (Data.quantity == null) {
            Errors.push('Quantity Can \'t be Blank');
        }
        if (Data.payment_date === 'T00:00:00.000Z' ) {
            Errors.push('Payment Date Can \'t be Blank');
        }
        if (Data.plan_sdate == null) {
            Errors.push('Start Date Can \'t be Blank');
        }
        return Errors ;
    }
    validationCreateUser(Data): string[] {
        const Errors = [];
        if (Data.email === '') {
            Errors.push('E Mail Can \'t be Blank');
        }
        if (Data.password === '') {
            Errors.push('Password Can \'t be Blank');
        }
        if (Data.first_name === '' ) {
            Errors.push('First Name Can \'t be Blank');
        }
        if (Data.last_name === '') {
            Errors.push('Last Name Can \'t be Blank');
        }
        if (Data.join_date === 'T00:00:00.000Z') {
            Errors.push('Join Date Can \'t be Blank');
        }
        if (Data.roles == null) {
            Errors.push('Roles Can \'t be Blank');
        }
        return Errors ;
    }
}
