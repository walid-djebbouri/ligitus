/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { LayoutService } from '../../../../@core/utils/layout.service';
import { ChartData } from '../../../../@core/interfaces/common/chart';

@Component({
  selector: 'ngx-stats-bar-animation-chart',
  template: `
    <div echarts
         [options]="options"
         class="echart"
         (chartInit)="onChartInit($event)">
    </div>
  `,
})
export class StatsBarAnimationChartComponent implements AfterViewInit, OnDestroy {

  private alive = true;

  @Input() lines: ChartData;

  echartsIntance: any;
  options: any = {};

  constructor(private theme: NbThemeService,
              private layoutService: LayoutService) {
    this.layoutService.onChangeLayoutSize()
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe(() => this.resizeChart());
  }

  ngAfterViewInit() {
    this.theme.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(config => {
        const profitBarAnimationEchart: any = config.variables.profitBarAnimationEchart;

        this.setChartOption(profitBarAnimationEchart);
    });
  }

  setChartOption(chartVariables) {
    this.options = {
      color: [
        chartVariables.firstAnimationBarColor,
        chartVariables.secondAnimationBarColor,
      ],
      grid: {
        left: 25,
        top: 30,
        right: 0,
        bottom: 16,
      },
      legend: {
        data: this.lines.legend,
        borderWidth: 0,
        borderRadius: 0,
        itemWidth: 15,
        itemHeight: 10,
        textStyle: {
          color: chartVariables.textColor,
        },
      },
      tooltip: {
        axisPointer: {
          type: 'shadow',
        },
        textStyle: {
          color: chartVariables.tooltipTextColor,
          fontWeight: chartVariables.tooltipFontWeight,
          fontSize: chartVariables.tooltipFontSize,
        },
        position: 'top',
        backgroundColor: chartVariables.tooltipBg,
        borderColor: chartVariables.tooltipBorderColor,
        borderWidth: chartVariables.tooltipBorderWidth,
        formatter: params => ` ${Math.round(parseInt(params.value, 10))}`,
        extraCssText: chartVariables.tooltipExtraCss,
      },
      xAxis: [
        {
          type: 'category',
          data: [ '7' ,  '' , '' , '' , '8' , '' , '' , '' , '9' , '', '' , '' , '10' , '' , '',
            '' , '11' , '' , '' , '', '12' , '' , '' , '' , '13', '' , '' , '' , '14' , '', '' , ''
            , '15' ,  '' , '', ''  , '16' , '' , '' , '' , '17' , '' , '' , '' , '18', '' , '' , '' , '19'  ],
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: '#00d68f' ,
            },
          },
          axisLabel: {
            color: '#00d68f',
            fontSize: 10 ,
          },
        },
      ],
      yAxis: [
        {
          axisLine: {
            show: true,
            lineStyle: {
              color:  '#00d68f',
            },

          },
          axisLabel: {
            show: true,
            color: '#00d68f',
            fontSize: 10 ,
          },
          axisTick: {
            show: true,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: chartVariables.splitLineStyleColor,
              opacity: chartVariables.splitLineStyleOpacity,
              width: chartVariables.splitLineStyleWidth,
            },
          },
        },
      ],
      series: [
        {
          name: 'Active',
          type: 'bar',
          data: this.lines.linesData[0],
          animationDelay: idx => idx * 10,
        },
        {
          name: 'Inactive',
          type: 'bar',
          data: this.lines.linesData[1],
          animationDelay: idx => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: idx => idx * 5,
    };
  }

  onChartInit(echarts) {
    this.echartsIntance = echarts;
  }

  resizeChart() {
    if (this.echartsIntance) {
      this.echartsIntance.resize();
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
