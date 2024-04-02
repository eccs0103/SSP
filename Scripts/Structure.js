"use strict";

import { } from "./Modules/Executors.js";
import { } from "./Modules/Extensions.js";
import { } from "./Modules/Generators.js";
import { } from "./Modules/Measures.js";
import { } from "./Modules/Palette.js";
import { } from "./Modules/Storage.js";
import { } from "./Modules/Time.js";

//#region Translation line
class TranslationLine {
	static #regex = /^(\d+)\|(\d+)\|(.+?)\|false$/;
	/**
	 * @param {string} line 
	 * @returns {TranslationLine}
	 */
	static parse(line) {
		const match = TranslationLine.#regex.exec(line);
		if (match === null) throw new SyntaxError(`Invalid line syntax`);
		const [, page, index, content] = match;
		const result = new TranslationLine();
		result.#page = Number(page);
		result.#index = Number(index);
		result.#content = content.split(/\|/);
		if (result.#content.length < 3) throw new SyntaxError(`Invalid line syntax`);
		return result;
	}
	/**
	 * @returns {string}
	 */
	toXML() {
		return `<string name="NAME_${this.#page}_${this.#index}">${this.#content[0]}</string>\n<string name="QUEST_${this.#page}_${this.#index}">${this.#content[1]}</string>\n<string name="TASK_${this.#page}_${this.#index}">${this.#content[2]}</string>`;
	}
	/** @type {number} */
	#page = 0;
	/** @readonly */
	get page() {
		return this.#page;
	}
	/** @type {number} */
	#index = 0;
	/** @readonly */
	get index() {
		return this.#index;
	}
	/** @type {string[]} */
	#content = [];
	/** @readonly */
	get content() {
		return this.#content;
	}
}
//#endregion
//#region Translation sheet
class TranslationSheet {
	/**
	 * @param {string} text 
	 * @returns {TranslationSheet}
	 */
	static parse(text) {
		const result = new TranslationSheet();
		result.#lines.push(...text.split(/\n+/).map((line, index) => {
			try {
				return TranslationLine.parse(line);
			} catch (error) {
				throw new SyntaxError(`Unable parse text 'cause of error in line ${index} with content '${line}'.`, { cause: error });
			}
		}));
		return result;
	}
	/**
	 * @returns {string}
	 */
	toXML() {
		return this.#lines.map(line => line.toXML()).join(`\n\n`);
	}
	/** @type {TranslationLine[]} */
	#lines = [];
	/** @readonly */
	get lines() {
		return Object.freeze(this.#lines);
	}
}
//#endregion

export { TranslationLine, TranslationSheet };