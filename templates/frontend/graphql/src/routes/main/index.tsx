import React from 'react'
import gql from 'graphql-tag'
import { List } from 'antd'
import { Query } from 'react-apollo'

const Search = gql`
	query {
		findListings {
			name
		}
	}
`

const Main = () => {
	return (
		<Query query={Search}>
			{({ loading, data }) => {
				return (
					<List
						renderItem={(item: any) => <List.Item>{item.name}</List.Item>}
						dataSource={data.findListings || []}
						loading={loading}
					/>
				)
			}}
		</Query>
	)
}

export default Main
