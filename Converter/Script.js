"use strict";

import { TranslationSheet } from "../Scripts/Structure.js";

try {
	//#region Definition
	const inputUploader = document.getElement(HTMLInputElement, `input#uploader`);
	//#endregion
	//#region Convertation
	inputUploader.addEventListener(`click`, (event) => {
		inputUploader.value = ``;
	});
	inputUploader.addEventListener(`change`, async (event) => {
		try {
			const files = inputUploader.files;
			if (files === null) throw new ReferenceError(`Unable to find files list`);
			for (const file of files) {
				const text = await file.text();
				const sheet = TranslationSheet.parse(text.trim());
				const XML = sheet.toXML();
				navigator.download(new File([XML], `${file.name.replace(/\..+$/, ``)}.xml`));
			}
		} catch (error) {
			await window.stabilize(Error.generate(error));
		}
	});
	//#endregion
} catch (error) {
	await window.stabilize(Error.generate(error));
}