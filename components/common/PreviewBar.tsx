import React, { useState } from 'react';

const PreviewBar = ({ isPreview, isDevelopmentMode }) => {

	const [open, setOpen] = useState(true)

	if (!isPreview && !isDevelopmentMode) return null

	const exitPreview = () => {
		if (!isDevelopmentMode) {
			const exit = confirm("Would you like to exit Preview Mode?");
			if (exit === true) {
				//kick out...
				window.location.href = `/api/exitPreview?slug=${window.location.pathname}`;
			}

			return exit
		} else {
			//if we are dev mode, just hide the panel
			setOpen(false)
		}
	}

	const sharePreviewLink = () => {
		const xhr = new XMLHttpRequest();
		xhr.onload = function () {

			// Process our return data
			if (xhr.status >= 200 && xhr.status < 300) {
				// What do when the request is successful

				const previewKey = xhr.responseText;
				let baseUrl = window.location.href
				if (baseUrl.indexOf("?") != -1) baseUrl = baseUrl.substring(0, baseUrl.indexOf("?"))
				const previewLink =  `${baseUrl}?agilitypreviewkey=${escape(previewKey)}`;

				prompt("To share this page in preview mode with others, copy the link below:", previewLink);

			} else {
				// What do when the request fails
				alert('Could not generate Preview Link. This indicates a problem with the API route that generates a Preview Link.')
			}
		};

		// Create and send a GET request
		xhr.open('GET', '/api/generatePreviewKey');
		xhr.send();
	}


	return (
		<div className="bg-indigo-600"
			style={{ display: open ? "auto" : "none" }} >
			<div className="max-w-screen-xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between flex-wrap">
					<div className="w-0 flex-1 flex items-center">
						<span className="flex p-2 rounded-lg bg-indigo-800">
							<img src="https://static.agilitycms.com/brand/agility-triangle-yellow.svg" alt="" className="w-5 h-5" />
						</span>
						<p className="ml-3 font-medium text-white truncate">
							<span className="md:hidden">
								Agility CMS - {isDevelopmentMode ? "Development" : "Preview"} Mode
							</span>
							<span className="hidden md:inline">
								Agility CMS - Viewing in {isDevelopmentMode ? "Development" : "Preview"} Mode
							</span>
						</p>
					</div>

					{ !isDevelopmentMode &&
						<div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
							<button onClick={() => sharePreviewLink()} aria-label="Share Preview" title="Share Preview Link" type="button" className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500 sm:-mr-2 transition ease-in-out duration-150">
								{/* <!-- Heroicon name: share --> */}
								<svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
							</svg>
							</button>
						</div>
					}

					<div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
						<button onClick={() => exitPreview()} aria-label="Exit Preview" title={ isDevelopmentMode ? "Hide Preview Bar" : "Exit Preview Mode"} type="button" className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500 sm:-mr-2 transition ease-in-out duration-150">
							{/* Heroicon name: x  */}
							<svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

				</div>
			</div>
		</div>

	)

}


export default PreviewBar;