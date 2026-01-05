export async function fetchRepoImages({ owner, repo, path, branches = ["main", "master"] }) {
    for (const branch of branches) {
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
        console.log("Fetching images from:", apiUrl);

        const res = await fetch(apiUrl, {
            headers: process.env.NEXT_PUBLIC_GITHUB_TOKEN
                ? { Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}` }
                : undefined,
        });

        // If the branch/path is missing, try the next branch
        if (res.status === 404) continue;

        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

        const items = await res.json();

        return items
            .filter(
                (item) =>
                    item.type === "file" &&
                    /\.(png|jpe?g|gif|webp|avif|svg)$/i.test(item.name)
            )
            .map((item) => ({
                name: item.name,
                url: `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}/${item.name}`,
            }));
    }

    throw new Error(`Path not found in branches: ${branches.join(", ")}`);
}