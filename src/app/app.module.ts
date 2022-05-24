import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index/index.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarComponent } from './navBar/navbar/navbar.component';
import { AboutComponent } from './data/about/about.component';
import { BannerComponent } from './data/banner/banner.component';
import { SkillsComponent } from './data/skills/skills.component';
import { ProjectsComponent } from './data/projects/projects.component';
import { interceptorProvider } from './interceptors/interceptor.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GalleryModule } from 'ng-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';

import { ProjectComponent } from './data/projects/project/project.component';
import { SkillsSelectorComponent } from './data/projects/skills-selector/skills-selector.component';
import { ImagesSelectorComponent } from './data/projects/images-selector/images-selector.component';
import { ImagePromptComponent } from './data/components/image-prompt/image-prompt.component';
import { FooterComponent } from './footer/footer.component';
import { StudiesComponent } from './data/studies/studies.component';
import { CurrentViewDirective } from './directives/current-view.directive';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavbarComponent,
    AboutComponent,
    BannerComponent,
    SkillsComponent,
    ProjectsComponent,
    ProjectComponent,
    SkillsSelectorComponent,
    ImagesSelectorComponent,
    ImagePromptComponent,
    FooterComponent,
    StudiesComponent,
    CurrentViewDirective
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    GalleryModule,
    NgxSpinnerModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
