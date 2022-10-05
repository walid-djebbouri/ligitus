/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserStore } from '../../../@core/stores/user.store';
import { SettingsData } from '../../../@core/interfaces/common/settings';
import { User } from '../../../@core/interfaces/common/users';
import {NB_AUTH_OPTIONS, NbAuthService, NbLogoutComponent, NbTokenService} from '@nebular/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent extends NbLogoutComponent implements OnInit,  OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: User;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
  ];

  currentTheme = 'dark';
  theme = 'default' ;

  userMenu = this.getMenuItems();

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userStore: UserStore,
              private settingsService: SettingsData,
              private layoutService: LayoutService,
              protected service: NbAuthService,
              private breakpointService: NbMediaBreakpointsService,
               protected router: Router,
              protected tokenService: NbTokenService ,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
  ) {
    super(service, options, router);
  }

  getMenuItems() {
    const userLink = this.user ?  '/pages/users/current/' : '';
    return [
      { title: 'Profile', link: userLink, queryParams: { profile: true } },
      { title: 'Log out', link: '/auth/logout' },
    ];
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.userStore.onUserStateChange()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((user: User) => {
        this.user = user;
        this.userMenu = this.getMenuItems();
      });

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.theme = themeName;
    this.themeService.changeTheme(themeName);
    this.userStore.setSetting(themeName);
   /* this.settingsService.updateCurrent(this.userStore.getUser().settings)
      .pipe(takeUntil(this.destroy$))
      .subscribe();*/

  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
  logout(): void {
    this.tokenService.clear();
    this.router.navigate(['/auth/login']);  }
}
