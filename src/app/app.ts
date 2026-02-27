import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroItem } from './components/hero-item/hero-item';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeroItem],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular-renaissance-workshop');
}
