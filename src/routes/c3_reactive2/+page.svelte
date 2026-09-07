<script>
	let color1 = $state('#ff0000');
	let color2 = $state('#0000ff');
	let mixedColor = $derived(mixColors(color1, color2));
	
	function hexToRgb(hex) {
		const r = parseInt(hex.slice(1, 3), 16);
		const g = parseInt(hex.slice(3, 5), 16);
		const b = parseInt(hex.slice(5, 7), 16);
		return { r, g, b };
	}
	
	function rgbToHex(r, g, b) {
		return '#' + [r, g, b].map(x => {
			const hex = x.toString(16);
			return hex.length === 1 ? '0' + hex : hex;
		}).join('');
	}
	
	function mixColors(c1, c2) {
		const rgb1 = hexToRgb(c1);
		const rgb2 = hexToRgb(c2);
		
		const mixedR = Math.round((rgb1.r + rgb2.r) / 2);
		const mixedG = Math.round((rgb1.g + rgb2.g) / 2);
		const mixedB = Math.round((rgb1.b + rgb2.b) / 2);
		
		return rgbToHex(mixedR, mixedG, mixedB);
	}
</script>

<div>
	<h1>色を混ぜるツール</h1>
	
    <div>
		{color1} + {color2} = {mixedColor}
	</div>

	<input type="color" bind:value={color1} />
	<span> + </span>
	<input type="color" bind:value={color2} />
	<span> = </span>
	<input type="color" value={mixedColor} />
	
    <p style="background-color:{mixedColor};">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, consectetur quidem? Voluptatum omnis sint saepe vitae ipsum natus et debitis perspiciatis. Labore error corrupti quasi omnis magni. Facilis itaque alias maiores nobis atque tenetur vitae maxime? Repellendus, architecto modi. Sequi aliquid voluptatibus magnam omnis porro voluptas dolorem suscipit laborum! Aperiam dolorem sunt officiis unde quasi amet veritatis atque ab debitis ullam est deleniti nostrum, ut libero voluptatibus obcaecati pariatur hic. Odio iste veniam ipsam ab non cum culpa ullam debitis inventore? Atque quo asperiores cupiditate exercitationem voluptate quibusdam. Nostrum inventore tenetur atque a eos adipisci consequuntur excepturi cupiditate error non!
    </p>

</div>