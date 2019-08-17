import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { editProduct } from './actions'
import './editProduct.scss'
import { editProductAction } from '../../store/actions';


class EditProduct extends Component {

	state = {
		name: '',
		weight: '',
		availability: '',
		productUrl: '',
		pricingTier: '',
		priceRangeIndex: '',
		isEditable:true,
	}

	componentDidMount(){
		const {products} = this.props;
		console.log(this.props , products ,"before cdm")
		if(products.length){
			let value = products.filter(v=>v.productId == this.props.location.state.productId)[0];
			this.setState({
			name: value.name,
			weight: value.weight,
			availability: value.availability,
			productUrl: value.productUrl,
			isEditable:value.isEditable,
		})
	}
}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });

	}


	handleCheckBox = (e) => {
		this.setState({ [e.target.name]: !this.state[e.target.name] });
	}


	handleSubmit = (e) => {
		e.preventDefault();

		let { name, weight, availability, productUrl, pricingTier, priceRangeIndex, isEditable } = this.state;
		let priceRange = this.props.pricingInfo[this.state.pricingTier];
		let data = {
			name,
			weight,
			availability,
			productUrl,
			pricingTier,
			priceRange,
			isEditable,
			productId : this.props.location.state.productId
		}
		console.log(data)
		let id = this.props.location.state.productId;
		this.props.dispatch(editProductAction(data,(cb)=>{
			if(cb) {
				this.props.history.push('/');
			}
		}))
	}



	render() {
		let { name, weight, productUrl, pricingTier, priceRange } = this.state;
		let price = this.state.pricingTier ? this.props.pricingInfo[this.state.pricingTier] : [];


		return (
			<div className="edit-form">
				<h3>UPDATE FORM</h3>
				<form onSubmit={this.handleSubmit}>
					{/* <div class="row"> */}
					<div className="">
						<label htmlFor="name">Name</label>
						<input className="u-full-width" onChange={this.handleChange} value={this.state.name}
							type='text' name='name' placeholder='enter product name' id="name" />
					</div>
					<div className="">
						<label htmlFor="weight">Weight</label>
						<input onChange={this.handleChange} className="u-full-width" value={this.state.weight}
						 type='number' name='weight' placeholder='enter the weight' id="weight" />
					</div>
					<div className="">
						<label htmlFor="availability">Availability</label>
						<input className="u-full-width" onChange={this.handleChange} value={this.state.availability}
							type='number' name='availability' placeholder='enter quantities available' id="availability" />
					</div>
					<div className="">
						<label htmlFor="productUrl">ProductURL</label>
						<input className="u-full-width" onChange={this.handleChange} value={this.state.productUrl}
							type='text' name='productUrl' placeholder='enter product url' id="productUrl" />
					</div>
					<div className='radio-group price-tier'>
					
						<section className='radio-group__child'>
							<input id='premier' onChange={this.handleChange} type="radio" name="pricingTier" value="premier" />
							<label htmlFor="premier">Premier</label>
						</section>

						<section className='radio-group__child'>
							<input id='budget' onChange={this.handleChange} type="radio" name="pricingTier" value="budget" />
							<label htmlFor="productUrl">Budget</label>
						</section>

						<section className="">
							{
								this.state.pricingTier ? (
									<div className="price-range">
										<select className="u-full-width selectBox" name='priceRange' id="priceRangeIndex" onChange={this.handleChange} >
										<option value=''>Select Price Range</option>
											{price.map((v, i) => {
												return <option key={i} value={i}>{v}</option>
											})
											}
										</select>
									</div>) : null}
						</section>

					</div>
					<label className="example-send-yourself-copy">
						<input onChange={this.handleCheckBox} name="isEditable" type="checkbox" checked={this.state.isEditable}/>
						<span className="label-body">Is Editable</span>
					</label>
					{
						name && weight && productUrl && pricingTier && priceRange ?
							<input className="button-primary" type="submit" value="Submit" /> : null
					}
				</form>
			</div>
		)
	}
}


function mapStateToProps(state) {
	return {
		products:state.products,
		pricingInfo: state.pricingInfo,
	}
}


export default connect(mapStateToProps)(EditProduct);



