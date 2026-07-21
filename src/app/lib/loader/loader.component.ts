import { Component, inject } from '@angular/core';
import { loaderService } from './loader.service';

@Component({
  selector: 'loader',
  template: `
    @if (isLoading()) {
      <div class="grid h-screen fixed right-8 z-50">
        <div class="place-self-end loader"></div>
      </div>
    }
  `,
  styles: `
    .loader {
      @apply border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-800;
    }
  `,
})
export class loaderComponent {
  isLoading = inject(loaderService).isLoading;
}
