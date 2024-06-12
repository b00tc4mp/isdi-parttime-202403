import Button from "./Button"

function Footer({ onCreatePostClick }) {
	const handleCreatePostClick = () => onCreatePostClick()
	return (
		<>
			<footer class="Footer">
				<Button onClick={handleCreatePostClick} class="Button">
					+
				</Button>
				<i class="fa-solid fa-arrow-up-long" aria-hidden="true"></i>
			</footer>
		</>
	)
}

export default Footer
