/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';

import * as L from 'leaflet';

import { CountryOrdersMapService } from './country-orders-map.service';
import { NbThemeService } from '@nebular/theme';
import { combineLatest } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import {BundlesCustCategoryService} from '../../../../@core/mock/common/bundles-cust-category.service';


@Component({
  selector: 'ngx-country-orders-map',
  styleUrls: ['./country-orders-map.component.scss'],
  template: `
    <div leaflet [leafletOptions]="options" [leafletLayers]="layers" (leafletMapReady)="mapReady($event)"></div>
  `,
})
export class CountryOrdersMapComponent implements OnDestroy , OnInit {

  @Input() countryId: string;

  @Output() select: EventEmitter<any> = new EventEmitter();
  stateData = [];
  layers = [];
  currentTheme: any;
  alive = true;
  selectedCountry;
  popup = L.popup();
  mapOfAlgeria ;

  options = {
    zoom: 5,
    minZoom: 2,
    maxZoom: 8,
    zoomControl: false,
    center: L.latLng({lat: 30 ,  lng: 3}),
    maxBounds: new L.LatLngBounds(
      new L.LatLng(-89.98155760646617, -180),
      new L.LatLng(89.99346179538875, 180),
    ),
    maxBoundsViscosity: 1.0,
  };

  constructor(private ecMapService: CountryOrdersMapService,
              private theme: NbThemeService,
              private dataService: BundlesCustCategoryService) {


    combineLatest([
      this.ecMapService.getCords(),
      this.theme.getJsTheme(),
      this.dataService.getStatusOfStat(),
    ])
      .pipe(takeWhile(() => this.alive))
      .subscribe(([cords, config, stats]: [any, any, any]) => {
        this.stateData = stats;
        this.currentTheme = config.variables.countryOrders;
        this.layers = [this.createGeoJsonLayer(cords)];
        this.selectFeature(this.findFeatureLayerByCountryId(this.countryId));
      });
  }

  ngOnInit(): void {}

  mapReady(map: L.Map) {
    map.addControl(L.control.zoom({position: 'bottomright'}));
    this.mapOfAlgeria = map ;
    // fix the map fully displaying, existing leaflet bag
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }

  private createGeoJsonLayer(cords) {
    cords.features.forEach((feature: any) => {
      feature.properties.newCase = 0;
      this.stateData.find(stat =>  {
        if (stat.id === feature.properties.id) {
          feature.properties.newCase = stat.values[4] / stat.values[5];
        }
      });
    } );
    return L.geoJSON(
      cords as any,
      {
        style: (feature) => ({
          weight: this.currentTheme.countryBorderWidth,
          fillColor: this.colorStyle(feature) ,
          fillOpacity: 1,
          color: this.currentTheme.countryBorderColor,
          opacity: 1,
        }),
        onEachFeature: (f, l) => {
          this.onEachFeature(f, l);
        },
      });
  }

  public getColor(target: number) {
    return target > 0.75  ? '#FC4E2A' :
                    target > 0.5   ? '#FD8D3C' :
                        target > 0.25   ? '#FEB24C' :
                            target > 0   ? '#FED976' :
                                this.currentTheme.countryFillColor;
  }


  colorStyle(feature: any): string {
    return this.getColor(feature.properties.newCase) ;
  }

  private onEachFeature(feature, layer) {
    layer.on({
      mouseover: (e) => this.highlightFeature(e.target),
      mouseout: (e) => this.moveout(e.target),
      click: (e) => this.selectFeature(e.target),
    });
  }

  private highlightFeature(featureLayer) {
    if (featureLayer) {
      featureLayer.setStyle({
        weight: this.currentTheme.hoveredCountryBorderWidth,
        fillColor: this.currentTheme.hoveredCountryFillColor,
        color: this.currentTheme.hoveredCountryBorderColor,
      });

      if (!L.Browser.ie && !L.Browser.opera12 && !L.Browser.edge) {
        featureLayer.bringToFront();
      }
    }
    this.popup.setLatLng([featureLayer._latlngs[0][0][0].lat , featureLayer._latlngs[0][0][0].lng])
        .setContent(featureLayer.feature.properties.name  )
        .openOn(this.mapOfAlgeria);
  }

  private moveout(featureLayer) {
    if (featureLayer !== this.selectedCountry) {
      this.resetHighlight(featureLayer);

      // When countries have common border we should highlight selected country once again
      this.highlightFeature(this.selectedCountry);
    }
  }

  private resetHighlight(featureLayer) {
    if (featureLayer) {
      const geoJsonLayer = this.layers[0];

      geoJsonLayer.resetStyle(featureLayer);
    }
  }

  private selectFeature(featureLayer) {
    if (featureLayer !== this.selectedCountry) {
      this.resetHighlight(this.selectedCountry);
      this.highlightFeature(featureLayer);
      this.selectedCountry = featureLayer;
      this.select.emit({ code: featureLayer.feature.id, name: featureLayer.feature.properties.name});
    }
  }

  private findFeatureLayerByCountryId(id) {
    const layers = this.layers[0].getLayers();
    const featureLayer = layers.find(item => {
     // return item.feature.id === id;
      return item.feature.properties.id === id;

    });

    return featureLayer ? featureLayer : null;
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
