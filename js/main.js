new Vue({
    el: '#app',
    data: {
        input: "",
        results: [],
        selectedLangs: [],
        show: true,
        languages: [
            { value: "zh-CN", name: "Chinese" },
            { value: "da", name: "Danish" },
            { value: "nl", name: "Dutch" },
            { value: "fi", name: "Finnish" },
            { value: "fr", name: "French" },
            { value: "de", name: "German" },
            { value: "el", name: "Greek" },
            { value: "id", name: "Indonesian" },
            { value: "it", name: "Italian" },
            { value: "ja", name: "Japanese" },
            { value: "ko", name: "Korean" },
            { value: "ms", name: "Malay" },
            { value: "no", name: "Norwegian" },
            { value: "pt", name: "Portuguese" },
            { value: "ru", name: "Russian" },
            { value: "es", name: "Spanish" },
            { value: "sv", name: "Swedish" },
            { value: "th", name: "Thai" },
            { value: "vi", name: "Vietnamese" },
        ]
    },
    methods: {
        translate() {
            let descs = this.input.split(".");
            this.selectedLangs.forEach(lang => {
                let obj = {
                    lang: "",
                    id: "",
                    desc: [],
                };
                descs.forEach(desc => {
                    let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${lang}&dt=t&q=${desc}`;
                    axios.get(url)
                        .then(response => {
                            // handle success
                            if (response.data[0][0][0])
                                obj.desc.push(response.data[0][0][0]);
                        });
                });

                obj.lang = lang;
                obj.id = `#${lang}`
                this.results.push(obj);

            });

            this.show = false;
        },
        // Copy text to clipboard
        copy(id) {
            let range = document.getSelection().getRangeAt(0);
            range.selectNode(document.getElementById(id));
            window.getSelection().addRange(range);
            document.execCommand("copy")
        }

    }
})