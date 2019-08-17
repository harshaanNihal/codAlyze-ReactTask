import React, { Component } from 'react';
import { connect } from 'react-redux';
import './home.scss'


class Home extends Component {

	state = {}

	handleEditProduct = (id) => {

		this.props.history.push({
			pathname: '/edit-product',
			state: {
				productId: id,
			}
		});
	}


	render() {
		var { products } = this.props;
		return (
				<table className="u-full-width table">
					<thead>
						<tr className="head-row">
							<th>#</th>
							<th>Name</th>
							<th>Weight</th>
							<th>Availability</th>
							<th>isEditable</th>
						</tr>
					</thead>
					<tbody>
						{products && products.map((prod,i) => {
							return (
								<tr key={i} className="row">
									<td>{i+1}</td>
									<td>{prod.name}</td>
									<td>{prod.weight}</td>
									<td>{prod.availability}</td>
									<td>{prod.isEditable ? <button onClick={() => this.handleEditProduct(prod.productId)}>Edit</button> : null}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
		)
	}
}




function mapStateToProps(state) {
	return {
		products: state.products,
	}
}

export default connect(mapStateToProps)(Home);



