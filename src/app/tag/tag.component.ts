import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { of } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';
import { Frontmatter } from '../shared/frontmatter';
import { MetaService } from '../shared/services/meta.service';
import { latestByDate } from '../shared/utils/operators/latest-by-date.operator';

@Component({
  selector: 'app-tag',
  template: `
    <app-all-blogs-btn></app-all-blogs-btn>
    <app-theme-toggler
      positionClass="transform translate-y-3 inline-block ml-1 lg:ml-0 lg:translate-y-0 lg:fixed lg:right-1"
    ></app-theme-toggler>
    <div class="rounded overflow-hidden shadow-common p-4 flex flex-col divide-y divide-gray-400">
      <ng-container *ngIf="taggedBlogs$ | async as taggedBlogs">
        <ng-container *ngIf="!taggedBlogs.length; else list">
          No blogs to display
        </ng-container>
        <ng-template #list>
          <app-blog-list-item *ngFor="let link of taggedBlogs" [route]="link"></app-blog-list-item>
        </ng-template>
      </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent {
  taggedBlogs$ = this.route.params.pipe(
    pluck('tagName'),
    switchMap((tagName: string) => {
      if (!tagName) return of([]);
      this.metaService.updateTagTitle(tagName);
      return this.scullyRoutesService.available$.pipe(
        map<Frontmatter[], Frontmatter[]>((routes) =>
          routes.filter(
            (route) =>
              route.tags?.[0] != null && route.tags[0].toLowerCase() === tagName.toLowerCase(),
          ),
        ),
        latestByDate(),
      );
    }),
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly scullyRoutesService: ScullyRoutesService,
    private readonly metaService: MetaService,
  ) {}
}
