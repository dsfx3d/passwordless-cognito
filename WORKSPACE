workspace(name = "passwordless_cognito")

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

### Bazel rules for NodeJS
http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "94070eff79305be05b7699207fbac5d2608054dd53e6109f7d00d923919ff45a",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/5.8.2/rules_nodejs-5.8.2.tar.gz"],
)

load("@build_bazel_rules_nodejs//:repositories.bzl", "build_bazel_rules_nodejs_dependencies")
build_bazel_rules_nodejs_dependencies()

load("@rules_nodejs//nodejs:repositories.bzl", "nodejs_register_toolchains")
nodejs_register_toolchains(
    name = "nodejs",
    node_version = "18.6.0",
)
### End Bazel rules for NodeJS

### Bazel rules for Aspect rules for JS
http_archive(
    name = "aspect_rules_js",
    sha256 = "7c50475662810ce9635fa45d718220285a8adef32b2febd8631aae62e5816353",
    strip_prefix = "rules_js-1.23.2",
    url = "https://github.com/aspect-build/rules_js/releases/download/v1.23.2/rules_js-v1.23.2.tar.gz",
)
load("@aspect_rules_js//js:repositories.bzl", "rules_js_dependencies")
rules_js_dependencies()

load("@aspect_rules_js//npm:npm_import.bzl", "npm_translate_lock")

# Uses the pnpm-lock.yaml file to automate creation of npm_import rules
npm_translate_lock(
    name = "npm",
    lifecycle_hooks_execution_requirements = {
        "*": [
            "no-sandbox",
        ],
    },
    npmrc = "//:.npmrc",
    pnpm_lock = "//:pnpm-lock.yaml",
    pnpm_version = "7.17.1",
    update_pnpm_lock = True,
    verify_node_modules_ignored = "//:.bazelignore",
)
### End Bazel rules for Aspect rules for JS

http_archive(
    name = "aspect_rules_ts",
    sha256 = "8eb25d1fdafc0836f5778d33fb8eaac37c64176481d67872b54b0a05de5be5c0",
    strip_prefix = "rules_ts-1.3.3",
    url = "https://github.com/aspect-build/rules_ts/releases/download/v1.3.3/rules_ts-v1.3.3.tar.gz",
)

##################
# rules_ts setup #
##################
# Fetches the rules_ts dependencies.
# If you want to have a different version of some dependency,
# you should fetch it *before* calling this.
# Alternatively, you can skip calling this function, so long as you've
# already fetched all the dependencies.
load("@aspect_rules_ts//ts:repositories.bzl", "rules_ts_dependencies")

rules_ts_dependencies(
    # This keeps the TypeScript version in-sync with the editor, which is typically best.
    ts_version_from = "//:package.json",

    # Alternatively, you could pick a specific version, or use
    # load("@aspect_rules_ts//ts:repositories.bzl", "LATEST_VERSION")
    # ts_version = LATEST_VERSION
)

http_archive(
    name = "aspect_rules_esbuild",
    sha256 = "f05e9a53ae4b394ca45742ac35f7e658a8ba32cba14b5d531b79466ae86dc7f0",
    strip_prefix = "rules_esbuild-0.14.0",
    url = "https://github.com/aspect-build/rules_esbuild/archive/refs/tags/v0.14.0.tar.gz",
)

######################
# rules_esbuild setup #
######################

# Fetches the rules_esbuild dependencies.
# If you want to have a different version of some dependency,
# you should fetch it *before* calling this.
# Alternatively, you can skip calling this function, so long as you've
# already fetched all the dependencies.
load("@aspect_rules_esbuild//esbuild:dependencies.bzl", "rules_esbuild_dependencies")

rules_esbuild_dependencies()

# Register a toolchain containing esbuild npm package and native bindings
load("@aspect_rules_esbuild//esbuild:repositories.bzl", "LATEST_VERSION", "esbuild_register_toolchains")

esbuild_register_toolchains(
    name = "esbuild",
    esbuild_version = LATEST_VERSION,
)


load("@npm//:repositories.bzl", "npm_repositories")
npm_repositories()
