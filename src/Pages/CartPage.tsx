import { Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import InfoIcon from "@mui/icons-material/Info";
import "../Components/ProductsPage/ProductPage.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CloseIcon from "@mui/icons-material/Close";
import { getCart } from "../Redux/AppRedux/actions";

const CartPage = ({ setOpenCart }: any) => {

	const dispatch=useDispatch()


	//@ts-ignore
	const cartItems = useSelector((store) => store.AppReducer.cart);

	const cartArray = Object.values(cartItems);
	console.log(cartArray);

	//@ts-ignore
	const frazo_cart = JSON.parse(localStorage.getItem("frazo_cart")) || {};


	const RemoveProduct=(ele:any)=>{
		delete frazo_cart[ele["frz-fw-500"]]

		fetch(`http://localhost:8080/cart`, {
			method: "POST",
			body: JSON.stringify(frazo_cart),
			headers: { "content-type": "application/json" },
		})
			.then((r) => r.json())
			.then((data) => {
				// setCount(() => {
				// 	if (frazo_cart[product["frz-fw-500"]])
				// 		return frazo_cart[product["frz-fw-500"]].cart_quantity;

				// 	return 0;
				// });
				//@ts-ignore
				dispatch(getCart());

				localStorage.setItem("frazo_cart", JSON.stringify(frazo_cart));
			});
	}





	if (cartArray.length) {
		return (
			<div id="fullCart">
				<div>
					<h2>My Cart ({cartArray.length} items)</h2>
					<CloseIcon
						sx={{ cursor: "pointer" }}
						onClick={() => setOpenCart(false)}
					/>
				</div>
				{cartArray.map((ele, indx: number) => (
					<div key={indx} className="CartChild">
						<div>
							{/*@ts-ignore*/}
							<img src={ele["lazy-image src"]} alt="" />
						</div>
						<div>
							{/*@ts-ignore*/}
							<p>{ele["frz-fw-500"]}</p>

							<p>
								{/*@ts-ignore*/}
								{ele["frz-pack-size"]}
								{/*@ts-ignore*/}
								{ele.tooltiptext && (
									/*@ts-ignore*/
									<Tooltip title={ele["tooltiptext"]} placement="top">
										<InfoIcon
											sx={{
												fontSize: "16px",
												marginBottom: "-4px",
												marginLeft: "6px",
												opacity: "0.6",
											}}
										/>
									</Tooltip>
								)}
							</p>

							<b>
								<CurrencyRupeeIcon sx={{ fontSize: "16px", margin: "-2px" }} />
								{/*@ts-ignore*/}
								{ele["frz-rp-10"]}
							</b>
							{/*@ts-ignore*/}
							{ele["frz-price-slash"] && ele["frz-price-slash"] !== "" ? (
								<span style={{ opacity: "0.7", marginLeft: "10px" }}>
									<s>
										<CurrencyRupeeIcon
											sx={{ fontSize: "16px", margin: "-2px" }}
										/>
										{/*@ts-ignore*/}
										{ele["frz-price-slash"]}
									</s>
								</span>
							) : (
								<></>
							)}
						</div>
						<div>
							<p onClick={()=>RemoveProduct(ele)}>Remove</p>
							{/*@ts-ignore*/}
							<p>Quantity {ele.cart_quantity}</p>
						</div>
					</div>
				))}
			</div>
		);
	} else {
		return (
			<div id="Cart">
				<div>
					<h2>My Cart ({cartArray.length} items)</h2>
					<CloseIcon
						sx={{ cursor: "pointer" }}
						onClick={() => setOpenCart(false)}
					/>
				</div>
				<br />
				<br />
				<br />
				<br />
				<br />
				<img
					src="https://webasset.fraazo.com/production/empty_cart.35cdf7d10a7af693e2ea.png"
					alt=""
				/>
				<br />
				<h2>Whoops... Cart is empty</h2>
				<p>Add some fruits, veggies and dairy products to your cart.</p>
				<br />
				<button
					style={{
						cursor: "pointer",
						padding: "14px 22px",
						borderRadius: "26px 26px",
						fontWeight: "600",
						fontSize: "14px",
						border: "2px solid #43c6ac",
						backgroundColor: "#43c6ac",
						color: "white",
					}}
					onClick={() => setOpenCart(false)}
				>
					Let's Shop!
				</button>
				<br />
				<br />
				<br />
				<br />
				<br />
			</div>
		);
	}
};

export default CartPage;
