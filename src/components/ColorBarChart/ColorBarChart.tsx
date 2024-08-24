import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { fetchList } from '../../services/api';

const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
};

const ColorBarChart: React.FC = () => {
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
  }, []);

  const categories = data.map(item => toTitleCase(item.name));
  const colors = data.map(item => item.color);
  const seriesData = data.map(item => item.year);

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'bar',
      events: {
        click: (chart, w, e) => {}
      }
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: colors,
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Year'
      },
      min: 1990,
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
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default ColorBarChart;
