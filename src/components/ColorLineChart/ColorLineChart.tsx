import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { fetchList } from '../../services/api';

const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
};

// const data = [
//   { id: 1, name: 'cerulean', year: 2000, color: '#9BB7D4', pantone_value: '15-4020' },
//   { id: 2, name: 'fuchsia rose', year: 2001, color: '#C74375', pantone_value: '17-2031' },
//   { id: 3, name: 'true red', year: 2002, color: '#BF1932', pantone_value: '19-1664' },
//   { id: 4, name: 'aqua sky', year: 2003, color: '#7BC4C4', pantone_value: '14-4811' },
//   { id: 5, name: 'tigerlily', year: 2004, color: '#E2583E', pantone_value: '17-1456' },
//   { id: 6, name: 'blue turquoise', year: 2005, color: '#53B0AE', pantone_value: '15-5217' }
// ];

const ColorLineChart: React.FC = () => {

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchList();
        if (response && response.data) {
          setData(response.data.data);
        } else {
          setError('No data available');
        }

      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [])

  const categories = data.map(item => toTitleCase(item.name));
  const seriesData = data.map(item => item.year);
  const colors = data.map(item => item.color);

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'line',
    },
    colors: colors,
    dataLabels: {
      enabled: false,
      formatter: function (val, opts) {
        return val.toString();
      },
      style: {
        fontSize: '12px',
        fontWeight: 'bold',
        colors: colors
      },
      background: {
        enabled: true,
        foreColor: '#fff',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#888',
      }
    },
    stroke: {
      curve: 'smooth',
      width: 1,
      colors: colors
    },
    markers: {
      size: 2,
      colors: colors,
      strokeColors: colors,
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          fontSize: '12px',
          colors: colors
        }
      }
    },
    yaxis: {
      title: {
        text: 'Year'
      },
      min: 2000,
      max: 2010,
      tickAmount: 5
    },
    tooltip: {
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        const color = colors[dataPointIndex];
        return `<div class="tooltip-custom" style="background-color: ${color}; padding: 10px; border-radius: 5px; color: #fff;">
                  <span>${categories[dataPointIndex]}: ${series[seriesIndex][dataPointIndex]}</span>
                </div>`;
      }
    }
  };

  const series = [{
    name: 'Year',
    data: seriesData
  }];

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default ColorLineChart;
