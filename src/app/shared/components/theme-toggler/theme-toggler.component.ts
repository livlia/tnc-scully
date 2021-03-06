import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggler',
  template: `
    <div class="w-full h-full text-2xl">
      <span *ngIf="current === 'dark'; else light">🌜</span>
      <ng-template #light>
        <span>🌞</span>
      </ng-template>
    </div>
    <!--    <svg-->
    <!--      class="w-full h-full"-->
    <!--      stroke="currentColor"-->
    <!--      fill="currentColor"-->
    <!--      stroke-width="0"-->
    <!--      xmlns="http://www.w3.org/2000/svg"-->
    <!--      x="0px"-->
    <!--      y="0px"-->
    <!--      viewBox="0 0 20 20"-->
    <!--      enable-background="new 0 0 20 20"-->
    <!--      xml:space="preserve"-->
    <!--      [id]="current === 'dark' ? 'Light_down' : 'Light_up'"-->
    <!--    >-->
    <!--      <path-->
    <!--        *ngIf="current === 'dark'; else light"-->
    <!--        d="M 10,6.797-->
    <!--c -1.775,0-3.2,1.426-3.2,3.201-->
    <!--c 0,1.773,1.425,3.199,3.2,3.199-->
    <!--c 1.774,0,3.199-1.426,3.199-3.199-->
    <!--C 13.199,8.223,11.774,6.797,10,6.797-->
    <!--z-->
    <!--M 10,12.047 -->
    <!--c -1.133,0 -2.051 -0.916 -2.051 -2.049 -->
    <!--c 0-1.133,0.918 -2.051,2.051 -2.051 -->
    <!--c 1.132,0,2.05,0.918,2.05,2.051-->
    <!--C 12.049,11.131,11.131,12.047,10,12.047-->
    <!--z-->
    <!--M 15,5 -->
    <!--c -0.312 -0.312 -0.883 -0.248 -1.273,0.142 -->
    <!--c -0.39,0.391 -0.453,0.959 -0.141,1.272-->
    <!--s 0.882,0.25,1.273 -0.141-->
    <!--C 15.249,5.883,15.312,5.312,15,5-->
    <!--z-->
    <!--M 5.142,13.729-->
    <!--C 4.751,14.119,4.688,14.688,5,15-->
    <!--s 0.882,0.25,1.273 -0.141 -->
    <!--c 0.391 -0.391,0.454 -0.961,0.142 -1.273-->
    <!--S 5.532,13.338,5.142,13.729-->
    <!--z-->
    <!--M 5,5-->
    <!--C 4.688,5.312,4.751,5.883,5.141,6.273 -->
    <!--c 0.391,0.391,0.961,0.453,1.273,0.141-->
    <!--s 0.249 -0.883 -0.142 -1.273-->
    <!--C 5.883,4.752,5.312,4.688,5,5-->
    <!--z-->
    <!--M 13.727,14.857 -->
    <!--c 0.39,0.391,0.96,0.455,1.273,0.143-->
    <!--s 0.249 -0.883 -0.142 -1.274 -->
    <!--c -0.391 -0.391 -0.96 -0.453 -1.273 -0.141-->
    <!--S 13.337,14.467,13.727,14.857-->
    <!--z-->
    <!--M 10,4.998 -->
    <!--c 0.441,0,0.8 -0.447,0.8 -1-->
    <!--C 10.799,3.445,10.441,3,10,3-->
    <!--C 9.558,3,9.199,3.445,9.199,3.998-->
    <!--C 9.199,4.551,9.557,4.998,10,4.998-->
    <!--z-->
    <!--M 10,17 -->
    <!--c 0.441,0,0.8 -0.447,0.8 -1 -->
    <!--c 0-0.553 -0.358 -0.998 -0.799 -0.998 -->
    <!--c -0.442,0 -0.801,0.445 -0.801,0.998-->
    <!--C 9.199,16.553,9.557,17,10,17-->
    <!--z-->
    <!--M 5,10 -->
    <!--c 0-0.441 -0.45 -0.8 -1.003 -0.8-->
    <!--C 3.444,9.2,3,9.559,3,10 -->
    <!--c 0,0.442,0.444,0.8,0.997,0.8-->
    <!--C 4.55,10.8,5,10.442,5,10-->
    <!--z-->
    <!--M 17,10 -->
    <!--c 0-0.441 -0.448 -0.8 -1.001 -0.8-->
    <!--C 15.446,9.2,15,9.559,15,10 -->
    <!--c 0,0.442,0.446,0.8,0.999,0.8-->
    <!--C 16.552,10.8,17,10.442,17,10-->
    <!--z"-->
    <!--      ></path>-->
    <!--      <ng-template #light>-->
    <!--        <path-->
    <!--          d="-->
    <!--M 19,9.199-->
    <!--c -0.182,0-0.799,0-0.98,0-->
    <!--c -0.553,0-1,0.359-1,0.801-->
    <!--c 0,0.441,0.447,0.799,1,0.799-->
    <!--c 0.182,0,0.799,0,0.98,0-->
    <!--c 0.552,0,1-0.357,1-0.799-->
    <!--C 20,9.559,19.551,9.199,19,9.199-->
    <!--z-->
    <!--M 10,4.5-->
    <!--c -3.051,0-5.5,2.449-5.5,5.5-->
    <!--c 0,3.051,2.449,5.5,5.5,5.5-->
    <!--c 3.05,0,5.5-2.449,5.5-5.5-->
    <!--C 15.5,6.949,13.049,4.5,10,4.5-->
    <!--z-->
    <!--M 10,14-->
    <!--c -2.211,0-4-1.791-4-4-->
    <!--c 0-2.211,1.789-4,4-4-->
    <!--c 2.209,0,4,1.789,4,4-->
    <!--C 14,12.209,12.209,14,10,14-->
    <!--z-->
    <!--M 3,10-->
    <!--c 0-0.441-0.449-0.801-1-0.801-->
    <!--c -0.185,0-0.816,0-1,0-->
    <!--c -0.553,0-1,0.359-1,0.801-->
    <!--c 0,0.441,0.447,0.799,1,0.799-->
    <!--c 0.184,0,0.815,0,1,0-->
    <!--C 2.551,10.799,3,10.441,3,10-->
    <!--z-->
    <!--M 10,3-->
    <!--c 0.441,0,0.799-0.447,0.799-1-->
    <!--c 0-0.184,0-0.816,0-1-->
    <!--c 0-0.553-0.358-1-0.799-1-->
    <!--C 9.558,0,9.199,0.447,9.199,1-->
    <!--c 0,0.184,0,0.816,0,1-->
    <!--C 9.199,2.553,9.558,3,10,3-->
    <!--z-->
    <!--M 10,17-->
    <!--c -0.442,0-0.801,0.447-0.801,1-->
    <!--c 0,0.184,0,0.816,0,1-->
    <!--c 0,0.553,0.359,1,0.801,1-->
    <!--c 0.441,0,0.799-0.447,0.799-1-->
    <!--c 0-0.184,0-0.816,0-1-->
    <!--C 10.799,17.447,10.441,17,10,17-->
    <!--z-->
    <!--M 17.365,3.766-->
    <!--c 0.391-0.391,0.454-0.961,0.142-1.273-->
    <!--s -0.883-0.248-1.272,0.143-->
    <!--c -0.108,0.107-0.593,0.592-0.7,0.699-->
    <!--c -0.391,0.391-0.454,0.961-0.142,1.273-->
    <!--s 0.883,0.248,1.273-0.143-->
    <!--C 16.773,4.357,17.257,3.873,17.365,3.766-->
    <!--z-->
    <!--M 3.334,15.533-->
    <!--c -0.108,0.109-0.593,0.594-0.7,0.701-->
    <!--c -0.391,0.391-0.454,0.959-0.142,1.271-->
    <!--s 0.883,0.25,1.272-0.141-->
    <!--c 0.108-0.107,0.593-0.592,0.7-0.699-->
    <!--c 0.391-0.391,0.454-0.961,0.142-1.274-->
    <!--S 3.723,15.144,3.334,15.533-->
    <!--z-->
    <!--M 3.765,2.635-->
    <!--C 3.375,2.244,2.804,2.18,2.492,2.492-->
    <!--S 2.244,3.375,2.633,3.766-->
    <!--c 0.108,0.107,0.593,0.592,0.7,0.699-->
    <!--c 0.391,0.391,0.96,0.455,1.272,0.143-->
    <!--s 0.249-0.883-0.141-1.273-->
    <!--C 4.357,3.227,3.873,2.742,3.765,2.635-->
    <!--z-->
    <!--M 15.534,16.666-->
    <!--c 0.108,0.107,0.593,0.592,0.7,0.699-->
    <!--c 0.391,0.391,0.96,0.453,1.272,0.143-->
    <!--c 0.312-0.312,0.249-0.883-0.142-1.273-->
    <!--c -0.107-0.107-0.592-0.592-0.699-0.699-->
    <!--c -0.391-0.391-0.961-0.455-1.274-0.143-->
    <!--S 15.143,16.275,15.534,16.666-->
    <!--z-->
    <!--"-->
    <!--        ></path>-->
    <!--      </ng-template>-->
    <!--    </svg>-->
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeTogglerComponent {
  @Input() positionClass: string;

  // For disabling Angular
  // @HostBinding('id') togglerId = 'themeToggler';

  @HostBinding('class') get themeTogglerClasses() {
    return (
      'w-10 h-10 lg:flex lg:items-center lg:justify-center cursor-pointer' +
      ' ' +
      this.positionClass
    );
  }

  @HostBinding('attr.aria-label') ariaLabel = 'Dark and Light mode toggle button';

  @HostListener('click')
  onClick() {
    this.themeService.update();
    this.current = this.themeService.scheme;
  }

  current = this.themeService.scheme;

  constructor(private readonly themeService: ThemeService) {}
}
