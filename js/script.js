const jobParent = document.querySelector('.jobs');
const input = document.querySelector('.input');

async function getData() {
	try {
		const URL = '../data/data.json';
		const res = await fetch(URL);
		const jobs = await res.json();

		function displayJobs(jobs) {
			jobs.forEach((job) => {
				const div = document.createElement('div');

				div.classList.add('job');
				const lanuguages = job.languages;
				const tools = job.tools;
				div.setAttribute('data-language', lanuguages.join(' '));
				div.setAttribute('data-tools', tools.join(' '));

				div.innerHTML = `
				            <div class="profile">
											<div class="logo">
												<img src="${job.logo}" alt="JobLogo" />
											</div>
											<div class="profileDetails">
												<div class="company">
				                  <p>${job.company}</p>
				                </div>
												<div class="role">
				                  <p>${job.position}</p>
				                </div>
												<div class="location">
													<p class="loc">${job.postedAt}</p>
				                  <div class="ball"></div>
													<p class="loc">${job.contract}</p>
				                  <div class="ball"></div>
													<p class="loc">${job.location}</p>
												</div>
											</div>
										</div>
				            <div class="positionDetails">
				                <div class="roles">
				                  <p class='loc tab'>${job.role}</p>
				                </div>
				                <div class="levels">
				                  <p class='loc tab' >${job.level}</p>
				                </div>
				                <div class="languages">
                          ${job.languages
														.map((language) => {
															return `<p class='loc tab'>${language}</p>`;
														})
														.join('')}
				                </div>
				                <div class="tools">
                            ${job.tools
															.map((tool) => {
																return `<p class='loc tab'>${tool}</p>`;
															})
															.join('')}
				                </div>
										</div>`;

				jobParent.appendChild(div);
			});
		}
		displayJobs(jobs);
	} catch (err) {
		console.error(err);
	}
}

getData();

function filterJobs() {
	const jobs = document.querySelectorAll('.job');
	const str = input.value.toLowerCase();
	jobs.forEach((job) => {
		const langAtrri = job
			.getAttribute('data-language')
			.toLowerCase()
			.split(' ');
		const toolAtrri = job.getAttribute('data-tools').toLowerCase().split(' ');

		const txt =
			langAtrri.some((language) => language.includes(str)) ||
			toolAtrri.some((tool) => tool.includes(str));

		job.style.display = txt ? 'flex' : 'none';
		console.log(job);
	});
}

input.addEventListener('input', filterJobs);
