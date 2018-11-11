import { ChangeDetectionStrategy, Component, Input, } from '@angular/core';
import { MediaGalleryType } from './media-gallery.model';
import { MediaMovie, MediaSeries } from '../store/media.model';

@Component({
  selector: 'app-media-gallery',
  templateUrl: './media-gallery.component.html',
  styleUrls: ['./media-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaGalleryComponent {

  @Input() galleryTitle: string;
  @Input() ariaLabel: string;
  @Input('movieGallery') set movieGallery(movieGallery: MediaMovie[]) {
    this.galleryType = MediaGalleryType.Movie;
    this.gallery = movieGallery;
  }
  @Input('seriesGallery') set seriesGallery(seriesGallery: MediaSeries[]) {
    this.galleryType = MediaGalleryType.Series;
    this.gallery = seriesGallery;
  }

  gallery: MediaMovie[] | MediaSeries[] = [];
  galleryType: MediaGalleryType = MediaGalleryType.Movie;
  galleryTypeList = MediaGalleryType;
  uuid = Math.random();
}
