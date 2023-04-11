interface SearchQueryInfo {
	data: {
		sqlString: string
		timing: number
		date: string
	}
	metrics: {
		query_count: number
		result_count: number
		select: number
		select_where: number
		select_left_join: number
	}
}

const combineSearchData = (
	searchQuery: [string, number, { type: string; where: string }],
	resultCount: number
) => {
	const data: SearchQueryInfo = {
		data: {
			sqlString: searchQuery[0].replace('Executed (default): ', ''),
			timing: searchQuery[1],
			date: new Date().toISOString()
		},
		metrics: {
			query_count: 1,
			result_count: +resultCount,
			select: searchQuery[2].type === 'SELECT' ? 1 : 0,
			select_where: searchQuery[2].where ? 1 : 0,
			select_left_join: searchQuery[2].type === 'SELECT LEFT JOIN' ? 1 : 0
		}
	}
	return data
}

export default combineSearchData
