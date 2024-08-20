"use client";

import { ObjectId } from "mongodb";
import Swal from "sweetalert2";

export function AddWishlistButton({ productId }: { productId: ObjectId }) {
	const handleAddWishlist = async () => {
		try {
			Swal.fire({
				title: "Loading...",
				allowOutsideClick: false,
				didOpen: () => {
					Swal.showLoading();
				},
			});

			const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlist", {
				method: "POST",
				cache: "no-store",
				body: JSON.stringify({
					productId,
					createdAt: new Date(),
					updatedAt: new Date(),
				}),
			});

			if (!response.ok) {
				window.location.href = "/login";
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			Swal.close();

			Swal.fire({
				icon: "success",
				title: "Successfully added to wishlist",
				showConfirmButton: false,
				timer: 1500,
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<button className="btn btn-outline" onClick={handleAddWishlist}>
			Add to Wishlist
		</button>
	);
}

export function DeleteWishlistButton({ id }: { id: ObjectId }) {
	const handleRemoveWishlist = async () => {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: "btn btn-success",
				cancelButton: "btn btn-danger",
			},
			buttonsStyling: false,
		});

		const result = await swalWithBootstrapButtons.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Yes, delete it",
			cancelButtonText: "No, cancel",
			reverseButtons: true,
		});

		if (result.isConfirmed) {
			try {
				Swal.fire({
					title: "Loading...",
					allowOutsideClick: false,
					didOpen: () => {
						Swal.showLoading();
					},
				});

				const response = await fetch(
					process.env.NEXT_PUBLIC_BASE_URL + `/api/wishlist/remove/${id}`,
					{
						method: "DELETE",
						cache: "no-store",
					}
				);

				Swal.close();

				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				swalWithBootstrapButtons.fire({
					title: "Deleted.",
					text: "Your wishlist has been deleted.",
					icon: "success",
					timer: 3000,
				});

				window.location.href = "/wishlist";
			} catch (error) {
				console.error(error);

				swalWithBootstrapButtons.fire({
					title: "Error",
					text: "An error occurred while deleting your wishlist.",
					icon: "error",
				});
			}
		} else if (result.dismiss === Swal.DismissReason.cancel) {
			swalWithBootstrapButtons.fire({
				title: "Cancelled",
				text: "Delete wishlist is cancelled.",
			});
		}
	};

	return (
		<button
			className="btn btn-outline border-red-600 hover:bg-red-400 hover:border-red-700 hover:text-white hover:font-bold"
			onClick={handleRemoveWishlist}
		>
			Remove
		</button>
	);
}
