export async function postGetter(tags, postsQnt = 10) {
    try {
        let api = await fetch(`https://e621.net/posts.json?login=louvinhauwu&api_key=BLwpHqmM7JvosAUFejug1ezD${tags ? `&tags=${tags}` : ""}&limit=${postsQnt}`)
        api = await api.json()

        if (!api.posts) {
            throw new Error("Não foi possível encontrar posts com essas tags, tente outra coisa ou arrume a grafia")
        } 
        return api
    } catch (e) {
        console.error(e)
    }

}