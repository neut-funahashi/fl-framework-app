import { OnInit, Inject, Injector, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { FlHttpRequestService } from '../http/fl-http-request.service';
import { FlServiceInjector } from './fl-service-injector';
import { Observable } from 'rxjs';
import { FlAlertService } from '../fl-alert/fl-alert.service';
import { delayBy } from '../decorators/fl-decorators';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
//import * as moment from 'moment';

// @dynamic
export abstract class FlComponentBase implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {

    protected flService: FlHttpRequestService;
    protected flAlert: FlAlertService;
    protected router: Router;
    protected location: Location;
    protected actRoute: ActivatedRoute;

    public serviceName: string;

    imaskPattern(value:string):any {
        return {    mask:new RegExp(value),
                    lazy: false
        };
    }

    get console():any{
        return console;
    }
    
    public ngOnInit(): any {
        this.initializeView();
    }

    @delayBy(50)
    public ngAfterViewInit() {
        this.createCompleteView();
    }

    public ngAfterViewChecked() {
        this.updateView();
    }

    public ngOnDestroy(): any {
        this.unActiveView();
        this.destroyView();
    }

    abstract initializeView(): void;
    abstract createCompleteView(): void;

    protected updateView(): void {
    }
    protected unActiveView(): void {
    }
    protected destroyView(): void {
    }

    constructor() {
        this.flService = FlServiceInjector.injector.get(FlHttpRequestService);
        this.flAlert = FlServiceInjector.injector.get(FlAlertService);
        this.router = FlServiceInjector.injector.get(Router);
        this.location = FlServiceInjector.injector.get(Location);
        this.actRoute = FlServiceInjector.injector.get(ActivatedRoute);
    }
    protected init(param:any, isDisplay:boolean = true, isErrAlert:boolean = true): Observable<Object> {
        return this.callCustomService(this.serviceName, "init", param, isDisplay, isErrAlert);
    }
    protected search(param, isDisplay:boolean = true, isErrAlert:boolean = true): Observable<Object> {
        return this.callCustomService(this.serviceName, "search", param, isDisplay, isErrAlert);
    }
    protected regist(param, isDisplay:boolean = true, isErrAlert:boolean = true): Observable<Object> {
        return this.callCustomService(this.serviceName, "regist", param, isDisplay, isErrAlert);
    }
    protected callService(methodName:string, param:any, isDisplay:boolean = true, isErrAlert:boolean = true): Observable<Object> {
        return this.callCustomService(this.serviceName, methodName, param, isDisplay, isErrAlert);
    }
    protected callCustomService(serviceName:string, methodName:string, param:any, isDisplay:boolean = true, isErrAlert:boolean = true): Observable<Object> {
        return this.flService.post(serviceName, methodName, param, isDisplay, isErrAlert);
    }
    protected saveFile(blob: Blob, fileName: string) {
        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(blob, fileName);
        }
        else {
            var a = document.createElement("a");
            a.href = (window.URL).createObjectURL(blob);
            a.target = '_blank';
            a.download = fileName;
            a.click();
        }
    }
    protected decodeBinaryData(data: any): ArrayBufferLike {
        let bin = atob(data.replace(/^.*,/, ''));
        let buffer = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; i++) {
            buffer[i] = bin.charCodeAt(i);
        }
        return buffer.buffer;
    }
}