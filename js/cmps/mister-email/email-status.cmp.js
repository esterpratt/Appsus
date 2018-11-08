'use strict'
//parent is mister-email.cmp.js in pages

export default {
    props: ['percentage'],
    template: `
    <section class="status-section"> 
<p> Progress: <span> {{percentage}} </span>% </p> 
<div class="progress-bar-full"> 
    <div :style="{ width: percentage + '%'}" class="progress-bar-inner">
    </div>
</div>

    </section>

    `
}