export interface RealTimeSearch {
  rank: number
  keyword: string
  rankChange: 'up' | 'down' | 'same'
}
