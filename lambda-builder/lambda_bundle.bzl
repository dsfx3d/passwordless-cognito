load("//esbuild:index.bzl", "esbuild")

def lambda_bundle(name, **kwargs):
  bundle_name = name + "_bundle"
  esbuild(
    name = bundle_name,
    output_dir = True,
    minify = True,
    **kwargs
  )
  native.genrule(
    name = name,
    srcs = [bundle_name],
    outs = [name + ".zip"],
    cmd = "cwd=$$(pwd) && cd $(RULEDIR)/{} && zip -r $$cwd/$@ .".format(bundle_name),
  )
