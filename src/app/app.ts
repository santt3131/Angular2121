import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './shared/components/footer/footer';
import { Header } from './shared/components/header/header';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, RouterOutlet],
  template: `
    <div
      class="grid min-h-screen grid-rows-[auto_1fr_auto] max-w-screen-2xl justify-between mx-auto pt-4"
    >
      <app-header class="col-span-3" />
      <router-outlet />
      <app-footer class="col-span-3" />
    </div>
  `,
})
export class App {}
