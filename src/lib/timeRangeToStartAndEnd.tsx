import type { TimeRanges } from '../components/TimeRangePick'
import { Time, time } from './time'

const timeRangeMap:{[k in TimeRanges['name']] : number} = {
    "custom":0,
    "this month": 0,
    "last month":-1,
    "two months ago":-2,
    "three months ago":-3,
    "this year" :0
   }

export const timeRangeToStartAndEnd = (timeRange:TimeRanges) =>{
    let selected: Time, start: Time, end: Time
    switch (timeRange.name) {
        case 'this month':
        case 'last month':
        case 'two months ago':
        case 'three months ago':
            selected = time().add(timeRangeMap[timeRange.name], 'month')
            start = selected.firstDayofMonth
            end = start.lastDayofMonth.add(1, 'day')
            return { start, end }
        case 'this year':
            start = time().set({month: 1}).firstDayofMonth
            end = time().add(1,'year').set({month:1}).firstDayofMonth
            return { start, end }
        case 'custom':
            return { start: time(), end: time() }
    }
}