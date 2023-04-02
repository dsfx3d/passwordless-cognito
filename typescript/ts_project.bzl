load("@aspect_rules_ts//ts:defs.bzl", project = "ts_project")

def ts_project(name, tsconfig = "//:tsconfig_base", **kwargs):
  project(
    name,
    tsconfig,
    declaration = True,
    **kwargs
  )


