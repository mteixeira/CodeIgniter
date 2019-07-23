
const clickPost = value => ({
	type: "CLICK_POST",
	pageClicked: value
});


const clickTag = value => ({
	type: "CLICK_TAG",
	tagClicked: value
});

const updatePosts = value => ({
	type: "UPDATE_POSTS",
	posts: value
});

const updateMedia = value => ({
	type: "UPDATE_MEDIA",
	medias: value
});

const updateTags = value => ({
	type: "UPDATE_TAGS",
	tags: value,
	value: value,
});

const updatecategories = value => ({
	type: "UPDATE_CATEGORIAS",
	categories: value,
	value: value,
});

const updateCarros = value => ({
	type: "UPDATE_CARROS",
	carros: value,
	value: value
});
