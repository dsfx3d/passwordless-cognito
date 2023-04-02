load("@aspect_rules_esbuild//esbuild:defs.bzl", esbuild_binary="esbuild")

def esbuild(name, srcs, deps, **kwargs):
  internal_deps = [
    "//:node_modules/@types/node",
    "//:node_modules/@jgoz/esbuild-plugin-typecheck",
    "//:tsconfig_base",
  ]

  esbuild_binary(
    name,
    srcs = srcs + deps + internal_deps,
    config = "//esbuild:config",
    target = "es2022",
    **kwargs,
  )
