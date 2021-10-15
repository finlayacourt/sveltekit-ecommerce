interface EnhanceInput {
	pending?: (body: FormData, form: HTMLFormElement) => void
	error?: (error: string, form: HTMLFormElement) => void
	result: (data: any, form: HTMLFormElement) => void
}

export function enhance(
	form: HTMLFormElement,
	input: EnhanceInput
): SvelteActionReturnType {

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault()
		const body = new FormData(form)
		const submitter = e.submitter as HTMLButtonElement
		if (submitter.name) body.append(submitter.name, submitter.value)
		
		if (input.pending) input.pending(body, form)

		try {
			const res = await fetch(form.action, {
				method: form.method,
				headers: {
					accept: "application/json"
				},
				body
			})
			if (res.ok) {
				const data = await res.json()
				input.result(data, form)
			} else {
				const error = await res.text()
				input.error(error, form)
			}
		} catch (e) {
			input.error(e.message, form)
		}		
	}

	form.addEventListener("submit", handleSubmit)

	return {
		destroy() {
			form.removeEventListener("submit", handleSubmit)
		}
	}
}