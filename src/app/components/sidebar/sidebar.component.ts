import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'assessment', class: '' },
    { path: '/persons', title: ' Persons',  icon:'account_box', class: '' },
    { path: '/managers', title: 'Managers',  icon:'supervisor_account', class: '' },
    { path: '/clients', title: 'Clients',  icon:'sentiment_satisfied', class: '' },
    { path: '/typography', title: 'Projects',  icon:'business_center', class: '' },
    { path: '/tjs', title: 'Daily Rates',  icon:'monetization_on', class: '' },
    { path: '/icons', title: 'Interventions',  icon:'touch_app', class: '' },




];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor() {
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

}
