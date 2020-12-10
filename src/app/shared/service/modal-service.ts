import { Injectable } from "@angular/core";

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmOkComponent } from '../components/confirm-ok/confirm-ok.component';
import { GraphSummaryComponent } from '../components/graph-summary/graph-summary.component';
import { LeaveSummaryComponent } from '../components/leave-summary/leave-summary.component';
import { NewLeaveComponent } from '../components/new-leave/new-leave.component';
import { SearchEmployeeComponent } from '../components/search-employee/search-employee.component';


@Injectable()
export class ModalService {

    constructor(private bsModalService: BsModalService) {

    }
    confirmOK(
        msg: string,
        confirmCallback: () => void,
        title?: string,
        confirmLabel?: string,
        cancelLabel?: string) {

        const clsname: string = (title === 'Information') ? 'confirmModal reassign-popup' : 'confirmModal';
        const modalRef: BsModalRef = this.bsModalService.show(ConfirmOkComponent, { class: clsname, ignoreBackdropClick: true, keyboard: false, animated: false, backdrop: 'static' });

        modalRef.content.title = title || 'Information';
        modalRef.content.confirmLabel = confirmLabel || 'OK';

        modalRef.content.msg = msg;
        modalRef.content.confirmCallback = confirmCallback;
        return modalRef;
    }

    openSearchPopUp(
        data: any,
        title?: string,
        confirmCallback?: (obj) => void,
        confirmLabel?: string,
        cancelLabel?: string) {
        const clsname: string = (title === 'Information') ? 'confirmModal reassign-popup' : 'confirmModal';
        const modalRef: BsModalRef = this.bsModalService.show(SearchEmployeeComponent, { class: clsname, ignoreBackdropClick: true, keyboard: false, animated: false, backdrop: 'static' });

        modalRef.content.title = title || 'Information';
        modalRef.content.confirmLabel = confirmLabel || 'OK';

        modalRef.content.msg = data;
        modalRef.content.confirmCallback = confirmCallback;
        return modalRef;
    }

    openLeavePopUp(
        data: any,
        title?: string,
        confirmCallback?: (obj) => void,
        confirmOkCallback?: (obj) => void,
        confirmLabel?: string,
        cancelLabel?: string) {
        const clsname: string = (title === 'Information') ? 'confirmModal reassign-popup' : 'confirmModal';
        const modalRef: BsModalRef = this.bsModalService.show(LeaveSummaryComponent, { class: clsname, ignoreBackdropClick: true, keyboard: false, animated: false, backdrop: 'static' });

        modalRef.content.title = title || 'Information';
        modalRef.content.confirmLabel = confirmLabel || 'OK';
        modalRef.content.cancelLabel = cancelLabel || 'Cancel';
        modalRef.content.msg = data;
        modalRef.content.confirmCallback = confirmCallback;
        modalRef.content.confirmOkCallback = confirmOkCallback;
        return modalRef;
    }

    openNewLeaveReqPopUp(
        data: any,
        title?: string,
        confirmCallback?: (obj) => void,
        confirmLabel?: string,
        cancelLabel?: string) {
        const clsname: string = (title === 'Information') ? 'confirmModal reassign-popup' : 'confirmModal';
        const modalRef: BsModalRef = this.bsModalService.show(NewLeaveComponent, { class: clsname, ignoreBackdropClick: true, keyboard: false, animated: false, backdrop: 'static' });

        modalRef.content.title = title || 'Information';
        modalRef.content.confirmLabel = confirmLabel || 'OK';

        modalRef.content.msg = data;
        modalRef.content.confirmCallback = confirmCallback;
        return modalRef;
    }

    openGraphSummaryPopUp(
        data: any,
        title?: string,
        confirmCallback?: (obj) => void,
        confirmLabel?: string,
        cancelLabel?: string) {
        const clsname: string = (title === 'Information') ? 'confirmModal reassign-popup' : 'confirmModal';
        const modalRef: BsModalRef = this.bsModalService.show(GraphSummaryComponent, { class: clsname, ignoreBackdropClick: true, keyboard: false, animated: false, backdrop: 'static' });

        modalRef.content.title = title || 'Information';
        modalRef.content.confirmLabel = confirmLabel || 'OK';

        modalRef.content.msg = data;
        modalRef.content.confirmCallback = confirmCallback;
        return modalRef;
    }

    
}