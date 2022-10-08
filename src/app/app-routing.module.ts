import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules, UrlSerializer} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AboutComponent} from './about/about.component';
import {CoursesModule} from './courses/courses.module';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CanLoadAuthGuard} from './services/can-load-auth.guard';
import {CustomPreloadingStrategy} from './services/custom-preloading.strategy';
import {ChatComponent} from './chat/chat.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: 'courses',
    pathMatch: "full",

  },
  {
    path: "courses",
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
    //canLoad: [CanLoadAuthGuard],
    data: {
      preload: false,
    }
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'helpdesk-chat',
    component: ChatComponent,
    outlet: 'chat',
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  }
];

// @ts-ignore
@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, {
        preloadingStrategy: CustomPreloadingStrategy, //This is used to load files for lazy load modules earlier or not, it does not work with canLoad: [CanLoadAuthGuard], to set up two multiple lazy loaded module
        enableTracing: false, //USE FOR DEBUGGING
        useHash: false,
        scrollPositionRestoration: 'enabled',
        paramsInheritanceStrategy: 'always', // get parameter in paramMap for parent route also
        relativeLinkResolution: 'corrected', //Set it as 'corrected'. if component has empty path e.g. path:"" then ../ and ./ work properly
        malformedUriErrorHandler: (error, urlSerializer, url) => {
          return urlSerializer.parse("/page-not-found");
        } // this will trigger if path not found or path has problem.
      })
  ],
  exports: [RouterModule],
  providers: [
    CanLoadAuthGuard,
    CustomPreloadingStrategy
  ]
})

export class AppRoutingModule {
}
