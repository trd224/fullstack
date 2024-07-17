import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { JwtInterceptor } from 'src/app/_interceptor/jwt.interceptor';

import { SharedModule } from './_modules/shared/shared.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './_components/layout/layout.component';
import { HeaderComponent } from './_components/header/header.component';
import { FooterComponent } from './_components/footer/footer.component';
import { SidenavComponent } from './_components/sidenav/sidenav.component';
import { Page404Component } from './_components/page404/page404.component';
import { DashboardComponent } from './_pages/dashboard/dashboard.component';
import { SignupComponent } from './_pages/signup/signup.component';
import { AboutComponent } from './_pages/about/about.component';
import { ClickLoggerDirective } from './_directives/click-logger.directive';
import { DirectiveExampleComponent } from './_pages/directive-example/directive-example.component';
import { DateFormatPipe } from './_pipes/date-format.pipe';
import { CustomPipeComponent } from './_pages/custom-pipe/custom-pipe.component';
import { LoginComponent } from './_pages/login/login.component';
//import { DashboardComponent } from './_pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    Page404Component,
    DashboardComponent,
    SignupComponent,
    AboutComponent,
    ClickLoggerDirective,
    DirectiveExampleComponent,
    DateFormatPipe,
    CustomPipeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
