

import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export default function BalanceStatistics() {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext('2d')

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['02:00', '02:30', '03:00', '03:30', '04:00', '04:30'],
        datasets: [
          {
            label: 'This month',
            data: [30, 45, 110, 170, 200, 150],
            borderColor: '#FF9800',
            backgroundColor: 'rgba(103, 232, 249, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: '#fff',
            pointBorderColor: '#7dd3fc',
            pointBorderWidth: 2,
          },
          {
            label: 'Total balance',
            data: [150, 400, 300, 350, 320, 500],
            borderColor: '#2563eb',
            backgroundColor: 'transparent',
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: '#fff',
            pointBorderColor: '#2563eb',
            pointBorderWidth: 2,
            yAxisID: 'y1',
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        plugins: {
          title: {
            display: true,
            text: 'Balance Statistic',
            color: '#FF9800',
            font: {
              size: 18,
              weight: '500',
              family: 'Inter, sans-serif'
            },
            padding: {
              top: 20,
              bottom: 20
            },
            align: 'start'
          },
          legend: {
            labels: {
              color: '#2563eb',
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 20,
              font: {
                family: 'Inter, sans-serif'
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(75, 85, 99, 0.3)',
              drawBorder: false
            },
            ticks: {
              color: '#94a3b8',
              font: {
                family: 'Inter, sans-serif'
              }
            }
          },
          y: {
            min: 0,
            max: 250,
            position: 'left',
            grid: {
              color: 'rgba(75, 85, 99, 0.3)',
              drawBorder: false
            },
            ticks: {
              color: '#94a3b8',
              font: {
                family: 'Inter, sans-serif'
              },
              stepSize: 50
            }
          },
          y1: {
            min: 0,
            max: 700,
            position: 'right',
            grid: {
              display: false
            },
            ticks: {
              color: '#94a3b8',
              font: {
                family: 'Inter, sans-serif'
              },
              stepSize: 100
            }
          }
        }
      }
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="w-[770px] p-6 rounded-lg  border-2 border-teal-500/20 hover:scale-105 
    hover:shadow-2xl hover:border-teal-500/60 hover:border:z-10 group transition-all duration-300 ease-in-out  ">
      <div className="h-[530px]">
        <canvas ref={chartRef} />
      </div>
    </div>
  )
}



