# Template Variables Reference

Generated from template_variables_report.json — 2025-09-23 03:40:00Z

This page lists variables used by templates, their safety and fallback status, and origins. Use the search in your browser to jump to a specific variable or template.

## Summary

- Total variables: 254
- Safely handled: 254
- Unsafe variables: None
- Variables with potentially unsafe defaults: sys_clk_freq_mhz

## Templates Index

- [_helpers.j2](#_helpers.j2)
- [python/build_integration.py.j2](#python-build_integration.py.j2)
- [python/pcileech_build_integration.py.j2](#python-pcileech_build_integration.py.j2)
- [sv/advanced_controller.sv.j2](#sv-advanced_controller.sv.j2)
- [sv/bar_controller.sv.j2](#sv-bar_controller.sv.j2)
- [sv/basic_bar_controller.sv.j2](#sv-basic_bar_controller.sv.j2)
- [sv/cfg_shadow.sv.j2](#sv-cfg_shadow.sv.j2)
- [sv/clock_crossing.sv.j2](#sv-clock_crossing.sv.j2)
- [sv/clock_gating.sv.j2](#sv-clock_gating.sv.j2)
- [sv/device_config.sv.j2](#sv-device_config.sv.j2)
- [sv/device_specific_ports.sv.j2](#sv-device_specific_ports.sv.j2)
- [sv/error_declarations.sv.j2](#sv-error_declarations.sv.j2)
- [sv/error_detection.sv.j2](#sv-error_detection.sv.j2)
- [sv/error_handling.sv.j2](#sv-error_handling.sv.j2)
- [sv/error_logging.sv.j2](#sv-error_logging.sv.j2)
- [sv/error_recovery.sv.j2](#sv-error_recovery.sv.j2)
- [sv/error_state_machine.sv.j2](#sv-error_state_machine.sv.j2)
- [sv/main_module.sv.j2](#sv-main_module.sv.j2)
- [sv/msix_capability_registers.sv.j2](#sv-msix_capability_registers.sv.j2)
- [sv/msix_implementation.sv.j2](#sv-msix_implementation.sv.j2)
- [sv/msix_table.sv.j2](#sv-msix_table.sv.j2)
- [sv/option_rom_bar_window.sv.j2](#sv-option_rom_bar_window.sv.j2)
- [sv/option_rom_spi_flash.sv.j2](#sv-option_rom_spi_flash.sv.j2)
- [sv/pcileech_cfgspace.coe.j2](#sv-pcileech_cfgspace.coe.j2)
- [sv/pcileech_fifo.sv.j2](#sv-pcileech_fifo.sv.j2)
- [sv/pcileech_tlps128_bar_controller.sv.j2](#sv-pcileech_tlps128_bar_controller.sv.j2)
- [sv/performance_counters.sv.j2](#sv-performance_counters.sv.j2)
- [sv/pmcsr_stub.sv.j2](#sv-pmcsr_stub.sv.j2)
- [sv/power_declarations.sv.j2](#sv-power_declarations.sv.j2)
- [sv/power_integration.sv.j2](#sv-power_integration.sv.j2)
- [sv/power_management.sv.j2](#sv-power_management.sv.j2)
- [sv/power_transitions.sv.j2](#sv-power_transitions.sv.j2)
- [sv/read_logic.sv.j2](#sv-read_logic.sv.j2)
- [sv/register_declarations.sv.j2](#sv-register_declarations.sv.j2)
- [sv/register_logic.sv.j2](#sv-register_logic.sv.j2)
- [sv/reporting_logic.sv.j2](#sv-reporting_logic.sv.j2)
- [sv/sampling_logic.sv.j2](#sv-sampling_logic.sv.j2)
- [sv/top_level_wrapper.sv.j2](#sv-top_level_wrapper.sv.j2)
- [tcl/bitstream.j2](#tcl-bitstream.j2)
- [tcl/constraints.j2](#tcl-constraints.j2)
- [tcl/device_setup.j2](#tcl-device_setup.j2)
- [tcl/header.j2](#tcl-header.j2)
- [tcl/implementation.j2](#tcl-implementation.j2)
- [tcl/ip_config.j2](#tcl-ip_config.j2)
- [tcl/ip_config_axi_pcie.j2](#tcl-ip_config_axi_pcie.j2)
- [tcl/ip_config_pcie7x.j2](#tcl-ip_config_pcie7x.j2)
- [tcl/ip_config_ultrascale.j2](#tcl-ip_config_ultrascale.j2)
- [tcl/master_build.j2](#tcl-master_build.j2)
- [tcl/pcileech_build.j2](#tcl-pcileech_build.j2)
- [tcl/pcileech_constraints.j2](#tcl-pcileech_constraints.j2)
- [tcl/pcileech_generate_project.j2](#tcl-pcileech_generate_project.j2)
- [tcl/pcileech_implementation.j2](#tcl-pcileech_implementation.j2)
- [tcl/pcileech_project_setup.j2](#tcl-pcileech_project_setup.j2)
- [tcl/pcileech_sources.j2](#tcl-pcileech_sources.j2)
- [tcl/project_setup.j2](#tcl-project_setup.j2)
- [tcl/sources.j2](#tcl-sources.j2)
- [tcl/synthesis.j2](#tcl-synthesis.j2)


<a id="_helpers.j2"></a>
## _helpers.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `FALLBACK_DEVICE_ID` | yes | no | no | src/templating/sv_context_builder.py, &lt;template_constants&gt; |  |
| `FALLBACK_VENDOR_ID` | yes | no | no | &lt;template_constants&gt; |  |

</details>


<a id="python-build_integration.py.j2"></a>
## python/build_integration.py.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `device_class` | yes | no | no | src/device_clone/manufacturing_variance.py, src/templating/sv_context_builder.py, src/device_clone/variance_manager.py, src/utils/unified_context.py, src/utils/metadata.py, src/device_clone/behavior_profiler.py, src/device_clone/device_config.py, src/templating/systemverilog_generator.py, src/templating/sv_module_generator.py |  |
| `device_config` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `power_management` | yes | no | no | src/device_clone/pcileech_context.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py, src/device_clone/donor_info_template.py, src/templating/systemverilog_generator.py |  |
| `transition_cycles` | yes | no | no | src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py |  |

</details>


<a id="python-pcileech_build_integration.py.j2"></a>
## python/pcileech_build_integration.py.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `build_system_version` | yes | no | no | src/templating/systemverilog_generator.py, src/utils/unified_context.py |  |
| `integration_type` | yes | no | no | src/templating/systemverilog_generator.py, src/utils/unified_context.py |  |
| `pcileech_modules` | yes | no | no | src/templating/systemverilog_generator.py, src/templating/template_context_validator.py |  |

</details>


<a id="sv-advanced_controller.sv.j2"></a>
## sv/advanced_controller.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `board_config` | yes | no | no | src/device_clone/pcileech_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `clock_domain_logic` | yes | no | no | src/templating/sv_module_generator.py, src/utils/unified_context.py |  |
| `device_class` | yes | no | no | src/device_clone/manufacturing_variance.py, src/templating/sv_context_builder.py, src/device_clone/variance_manager.py, src/utils/unified_context.py, src/utils/metadata.py, src/device_clone/behavior_profiler.py, src/device_clone/device_config.py, src/templating/systemverilog_generator.py, src/templating/sv_module_generator.py |  |
| `device_config` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `device_specific_ports` | yes | no | no | src/templating/sv_module_generator.py, src/utils/unified_context.py |  |
| `device_type` | yes | no | no | src/templating/advanced_sv_perf.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/device_clone/device_config.py, src/templating/systemverilog_generator.py, src/templating/sv_module_generator.py |  |
| `error_config` | yes | no | no | src/device_clone/pcileech_context.py, src/templating/sv_context_builder.py, src/templating/systemverilog_generator.py, src/utils/unified_context.py |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `interrupt_logic` | yes | no | no | src/templating/sv_module_generator.py, src/utils/unified_context.py |  |
| `perf_config` | yes | no | no | src/templating/sv_context_builder.py, src/templating/systemverilog_generator.py, src/utils/unified_context.py |  |
| `power_config` | yes | no | no | src/device_clone/pcileech_context.py, src/templating/sv_context_builder.py, src/templating/systemverilog_generator.py, src/utils/unified_context.py |  |
| `read_logic` | yes | no | no | src/templating/sv_module_generator.py, src/utils/unified_context.py |  |
| `register_logic` | yes | no | no | src/templating/sv_module_generator.py, src/utils/unified_context.py |  |

</details>


<a id="sv-bar_controller.sv.j2"></a>
## sv/bar_controller.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `BAR_APERTURE_SIZE` | yes | no | no | src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `CONFIG_SHDW_HI` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt;, src/utils/unified_context.py |  |
| `CUSTOM_WIN_BASE` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt;, src/utils/unified_context.py |  |
| `MSIX_PBA_BIR` | yes | no | no | src/utils/unified_context.py, src/device_clone/pcileech_context.py |  |
| `MSIX_PBA_OFFSET` | yes | no | no | src/utils/unified_context.py, src/device_clone/pcileech_context.py |  |
| `MSIX_TABLE_BIR` | yes | no | no | src/utils/unified_context.py, src/device_clone/pcileech_context.py |  |
| `MSIX_TABLE_OFFSET` | yes | no | no | src/utils/unified_context.py, src/device_clone/pcileech_context.py |  |
| `NUM_MSIX` | yes | no | no | src/utils/unified_context.py, src/templating/sv_context_builder.py, src/templating/template_context_validator.py, src/device_clone/pcileech_context.py |  |
| `USE_BYTE_ENABLES` | yes | no | no | src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |

</details>


<a id="sv-basic_bar_controller.sv.j2"></a>
## sv/basic_bar_controller.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `config_space` | yes | no | no | src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `device` | yes | no | no | src/templating/tcl_builder.py, src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/templating/systemverilog_generator.py, src/templating/sv_module_generator.py |  |
| `device_config` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `device_id_int` | yes | no | no | src/device_clone/pcileech_context.py, &lt;template_local&gt;, src/templating/sv_context_builder.py, src/utils/unified_context.py |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `vendor_id_int` | yes | no | no | src/device_clone/pcileech_context.py, &lt;template_local&gt;, src/templating/sv_context_builder.py, src/utils/unified_context.py |  |

</details>


<a id="sv-cfg_shadow.sv.j2"></a>
## sv/cfg_shadow.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `CONFIG_SPACE_SIZE` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt;, src/utils/unified_context.py |  |
| `DUAL_PORT` | yes | no | no | src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `EXT_CFG_CAP_PTR` | yes | no | yes | src/device_clone/pcileech_context.py |  |
| `EXT_CFG_XP_CAP_PTR` | yes | no | yes | src/device_clone/pcileech_context.py |  |
| `OVERLAY_ENTRIES` | yes | no | no | src/utils/unified_context.py, src/device_clone/overlay_mapper.py, src/device_clone/pcileech_context.py |  |
| `OVERLAY_MAP` | yes | no | no | src/utils/unified_context.py, src/device_clone/overlay_mapper.py, src/device_clone/pcileech_context.py |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |

</details>


<a id="sv-clock_crossing.sv.j2"></a>
## sv/clock_crossing.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `board_config` | yes | no | no | src/device_clone/pcileech_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `device_config` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |

</details>


<a id="sv-clock_gating.sv.j2"></a>
## sv/clock_gating.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `config` | yes | no | no | src/templating/advanced_sv_features.py, src/templating/advanced_sv_error.py, src/utils/unified_context.py |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |

</details>


<a id="sv-device_config.sv.j2"></a>
## sv/device_config.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `bars` | yes | no | no | src/device_clone/pcileech_generator.py, src/device_clone/config_space_manager.py, src/utils/unified_context.py, src/device_clone/fallback_manager.py, &lt;template_local&gt;, src/device_clone/donor_info_template.py, src/device_clone/pcileech_context.py, src/device_clone/device_info_lookup.py, src/templating/systemverilog_generator.py |  |
| `config_space` | yes | no | no | src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `device` | yes | no | no | src/templating/tcl_builder.py, src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/templating/systemverilog_generator.py, src/templating/sv_module_generator.py |  |
| `device_config` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `device_id_int` | yes | no | no | src/device_clone/pcileech_context.py, &lt;template_local&gt;, src/templating/sv_context_builder.py, src/utils/unified_context.py |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `vendor_id_int` | yes | no | no | src/device_clone/pcileech_context.py, &lt;template_local&gt;, src/templating/sv_context_builder.py, src/utils/unified_context.py |  |

</details>


<a id="sv-device_specific_ports.sv.j2"></a>
## sv/device_specific_ports.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `board_config` | yes | no | no | src/device_clone/pcileech_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `device_config` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `device_type` | yes | no | no | src/templating/advanced_sv_perf.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/device_clone/device_config.py, src/templating/systemverilog_generator.py, src/templating/sv_module_generator.py |  |

</details>


<a id="sv-error_declarations.sv.j2"></a>
## sv/error_declarations.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `config` | yes | no | no | src/templating/advanced_sv_features.py, src/templating/advanced_sv_error.py, src/utils/unified_context.py |  |

</details>


<a id="sv-error_detection.sv.j2"></a>
## sv/error_detection.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `config` | yes | no | no | src/templating/advanced_sv_features.py, src/templating/advanced_sv_error.py, src/utils/unified_context.py |  |

</details>


<a id="sv-error_handling.sv.j2"></a>
## sv/error_handling.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `error_handling` | yes | no | no | src/device_clone/pcileech_context.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py, src/device_clone/donor_info_template.py, src/templating/systemverilog_generator.py |  |

</details>


<a id="sv-error_logging.sv.j2"></a>
## sv/error_logging.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `config` | yes | no | no | src/templating/advanced_sv_features.py, src/templating/advanced_sv_error.py, src/utils/unified_context.py |  |

</details>


<a id="sv-error_recovery.sv.j2"></a>
## sv/error_recovery.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `config` | yes | no | no | src/templating/advanced_sv_features.py, src/templating/advanced_sv_error.py, src/utils/unified_context.py |  |
| `error_name` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt; |  |
| `error_thresholds` | yes | no | no | src/templating/advanced_sv_features.py, src/utils/unified_context.py |  |
| `error_value` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt; |  |
| `fatal_errors` | yes | no | no | src/templating/advanced_sv_features.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `recoverable_errors` | yes | no | no | src/templating/advanced_sv_features.py, src/utils/unified_context.py |  |

</details>


<a id="sv-error_state_machine.sv.j2"></a>
## sv/error_state_machine.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `config` | yes | no | no | src/templating/advanced_sv_features.py, src/templating/advanced_sv_error.py, src/utils/unified_context.py |  |

</details>


<a id="sv-main_module.sv.j2"></a>
## sv/main_module.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `FALLBACK_DEVICE_ID` | yes | no | no | src/templating/sv_context_builder.py, &lt;template_constants&gt; |  |
| `FALLBACK_VENDOR_ID` | yes | no | no | &lt;template_constants&gt; |  |
| `config_space` | yes | no | no | src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `device` | yes | no | no | src/templating/tcl_builder.py, src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/templating/systemverilog_generator.py, src/templating/sv_module_generator.py |  |
| `device_class` | yes | no | no | src/device_clone/manufacturing_variance.py, src/templating/sv_context_builder.py, src/device_clone/variance_manager.py, src/utils/unified_context.py, src/utils/metadata.py, src/device_clone/behavior_profiler.py, src/device_clone/device_config.py, src/templating/systemverilog_generator.py, src/templating/sv_module_generator.py |  |
| `device_config` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `device_id_int` | yes | no | no | src/device_clone/pcileech_context.py, &lt;template_local&gt;, src/templating/sv_context_builder.py, src/utils/unified_context.py |  |
| `device_type` | yes | no | no | src/templating/advanced_sv_perf.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/device_clone/device_config.py, src/templating/systemverilog_generator.py, src/templating/sv_module_generator.py |  |
| `error_handling` | yes | no | no | src/device_clone/pcileech_context.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py, src/device_clone/donor_info_template.py, src/templating/systemverilog_generator.py |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `performance_counters` | yes | no | no | src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py, src/device_clone/donor_info_template.py, src/device_clone/pcileech_context.py |  |
| `power_management` | yes | no | no | src/device_clone/pcileech_context.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py, src/device_clone/donor_info_template.py, src/templating/systemverilog_generator.py |  |
| `registers` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_module_generator.py, src/device_clone/variance_manager.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py, src/device_clone/behavior_profiler.py, src/device_clone/pcileech_context.py, src/device_clone/device_config.py, src/templating/tcl_builder.py |  |
| `vendor_id_int` | yes | no | no | src/device_clone/pcileech_context.py, &lt;template_local&gt;, src/templating/sv_context_builder.py, src/utils/unified_context.py |  |

</details>


<a id="sv-msix_capability_registers.sv.j2"></a>
## sv/msix_capability_registers.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `msix_config` | yes | no | no | src/build.py, src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |

</details>


<a id="sv-msix_implementation.sv.j2"></a>
## sv/msix_implementation.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `msix_config` | yes | no | no | src/build.py, src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |

</details>


<a id="sv-msix_table.sv.j2"></a>
## sv/msix_table.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `msix_config` | yes | no | no | src/build.py, src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |

</details>


<a id="sv-option_rom_bar_window.sv.j2"></a>
## sv/option_rom_bar_window.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `ALLOW_ROM_WRITES` | yes | no | no | src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `ENABLE_SIGNATURE_CHECK` | yes | no | no | src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `INIT_ROM` | yes | no | no | src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `ROM_BAR_INDEX` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt;, src/utils/unified_context.py |  |
| `ROM_HEX_FILE` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt;, src/utils/unified_context.py |  |
| `ROM_SIZE` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt;, src/utils/unified_context.py |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |

</details>


<a id="sv-option_rom_spi_flash.sv.j2"></a>
## sv/option_rom_spi_flash.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `CACHE_SIZE` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt; |  |
| `ENABLE_CACHE` | yes | no | no | src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `FLASH_ADDR_OFFSET` | yes | no | no | src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `INIT_CACHE_VALID` | yes | no | no | src/templating/template_context_validator.py |  |
| `QSPI_ONLY_CMD` | yes | no | no | src/templating/template_context_validator.py |  |
| `RESET_CLEAR` | yes | no | no | src/templating/template_context_validator.py |  |
| `ROM_SIZE` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt;, src/utils/unified_context.py |  |
| `SIGNATURE_CHECK` | yes | no | no | src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `SPI_FAST_CMD` | yes | no | no | src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `USE_QSPI` | yes | no | no | src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |

</details>


<a id="sv-pcileech_cfgspace.coe.j2"></a>
## sv/pcileech_cfgspace.coe.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `aer` | yes | no | no | src/utils/unified_context.py |  |
| `bar_config` | yes | no | no | src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `config_space` | yes | no | no | src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `device` | yes | no | no | src/templating/tcl_builder.py, src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/templating/systemverilog_generator.py, src/templating/sv_module_generator.py |  |
| `device_config` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `device_id_int` | yes | no | no | src/device_clone/pcileech_context.py, &lt;template_local&gt;, src/templating/sv_context_builder.py, src/utils/unified_context.py |  |
| `generation_metadata` | yes | no | no | src/device_clone/pcileech_generator.py, src/utils/unified_context.py, src/templating/systemverilog_generator.py, src/device_clone/pcileech_context.py |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `msix_config` | yes | no | no | src/build.py, src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `msix_pba_bir` | yes | no | no | &lt;template_local&gt;, src/templating/sv_context_builder.py |  |
| `msix_pba_offset` | yes | no | no | &lt;template_local&gt;, src/templating/sv_context_builder.py |  |
| `msix_table_bir` | yes | no | no | &lt;template_local&gt;, src/templating/sv_context_builder.py |  |
| `msix_table_offset` | yes | no | no | &lt;template_local&gt;, src/templating/sv_context_builder.py |  |
| `pba_offset_bir` | yes | no | no | &lt;template_local&gt;, src/templating/sv_context_builder.py, src/device_clone/msix_capability.py |  |
| `pcileech_config` | yes | no | no | src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `table_offset_bir` | yes | no | no | &lt;template_local&gt;, src/templating/sv_context_builder.py, src/device_clone/msix_capability.py |  |
| `timing_config` | yes | no | no | src/templating/template_renderer.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `vendor_id_int` | yes | no | no | src/device_clone/pcileech_context.py, &lt;template_local&gt;, src/templating/sv_context_builder.py, src/utils/unified_context.py |  |

</details>


<a id="sv-pcileech_fifo.sv.j2"></a>
## sv/pcileech_fifo.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `config_space` | yes | no | no | src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `data_width` | yes | no | yes | src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py |  |
| `device` | yes | no | no | src/templating/tcl_builder.py, src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/templating/systemverilog_generator.py, src/templating/sv_module_generator.py |  |
| `device_config` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `device_id_int` | yes | no | no | src/device_clone/pcileech_context.py, &lt;template_local&gt;, src/templating/sv_context_builder.py, src/utils/unified_context.py |  |
| `device_specific_config` | yes | no | no | src/templating/systemverilog_generator.py, src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `enable_clock_crossing` | yes | no | no | src/templating/sv_context_builder.py, src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `enable_custom_config` | yes | no | no | src/templating/sv_context_builder.py, src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `enable_error_detection` | yes | no | no | src/templating/sv_context_builder.py, src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `enable_interrupt` | yes | no | no | src/templating/sv_context_builder.py, src/utils/unified_context.py |  |
| `enable_performance_counters` | yes | no | no | src/templating/sv_context_builder.py, src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `enable_scatter_gather` | yes | no | no | src/utils/unified_context.py, src/templating/sv_context_builder.py, src/device_clone/pcileech_context.py |  |
| `fifo_depth` | yes | no | yes | src/templating/sv_context_builder.py |  |
| `fifo_type` | yes | no | no | src/templating/sv_context_builder.py, src/utils/unified_context.py |  |
| `fpga_family` | yes | no | yes | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, src/device_clone/board_config.py, src/templating/tcl_builder.py |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `vendor_id_int` | yes | no | no | src/device_clone/pcileech_context.py, &lt;template_local&gt;, src/templating/sv_context_builder.py, src/utils/unified_context.py |  |

</details>


<a id="sv-pcileech_tlps128_bar_controller.sv.j2"></a>
## sv/pcileech_tlps128_bar_controller.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `bar_config` | yes | no | no | src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `config_space` | yes | no | no | src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `device` | yes | no | no | src/templating/tcl_builder.py, src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/templating/systemverilog_generator.py, src/templating/sv_module_generator.py |  |
| `device_config` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `device_id_int` | yes | no | no | src/device_clone/pcileech_context.py, &lt;template_local&gt;, src/templating/sv_context_builder.py, src/utils/unified_context.py |  |
| `device_signature` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, src/utils/metadata.py, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `msix_config` | yes | no | no | src/build.py, src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `timing_config` | yes | no | no | src/templating/template_renderer.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `vendor_id_int` | yes | no | no | src/device_clone/pcileech_context.py, &lt;template_local&gt;, src/templating/sv_context_builder.py, src/utils/unified_context.py |  |

</details>


<a id="sv-performance_counters.sv.j2"></a>
## sv/performance_counters.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `avg_packet_size` | yes | no | yes | src/templating/advanced_sv_perf.py, src/utils/unified_context.py |  |
| `bandwidth_sample_period` | yes | no | yes | src/templating/advanced_sv_perf.py, src/utils/unified_context.py |  |
| `bandwidth_shift` | yes | no | yes | src/templating/advanced_sv_perf.py, src/utils/unified_context.py |  |
| `device_type` | yes | no | no | src/templating/advanced_sv_perf.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/device_clone/device_config.py, src/templating/systemverilog_generator.py, src/templating/sv_module_generator.py |  |
| `error_signals_available` | yes | no | no | src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `generic_signals_available` | yes | no | no | src/templating/template_context_validator.py |  |
| `graphics_signals_available` | yes | no | no | src/templating/template_context_validator.py |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `high_bandwidth_threshold` | yes | no | yes | src/templating/advanced_sv_perf.py, src/utils/unified_context.py |  |
| `high_performance_threshold` | yes | no | yes | src/templating/advanced_sv_perf.py, src/utils/unified_context.py |  |
| `low_error_threshold` | yes | no | yes | src/templating/advanced_sv_perf.py, src/utils/unified_context.py |  |
| `low_latency_threshold` | yes | no | yes | src/templating/advanced_sv_perf.py, src/utils/unified_context.py |  |
| `medium_bandwidth_threshold` | yes | no | yes | src/templating/advanced_sv_perf.py, src/utils/unified_context.py |  |
| `medium_error_threshold` | yes | no | yes | src/templating/advanced_sv_perf.py, src/utils/unified_context.py |  |
| `medium_latency_threshold` | yes | no | yes | src/templating/advanced_sv_perf.py, src/utils/unified_context.py |  |
| `medium_performance_threshold` | yes | no | yes | src/templating/advanced_sv_perf.py, src/utils/unified_context.py |  |
| `min_operations_for_error_rate` | yes | no | yes | src/templating/advanced_sv_perf.py, src/utils/unified_context.py |  |
| `network_signals_available` | yes | no | no | src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `perf_config` | yes | no | no | src/templating/sv_context_builder.py, src/templating/systemverilog_generator.py, src/utils/unified_context.py |  |
| `storage_signals_available` | yes | no | no | src/templating/template_context_validator.py |  |
| `transfer_width` | yes | no | yes | src/templating/advanced_sv_perf.py, src/utils/unified_context.py |  |

</details>


<a id="sv-pmcsr_stub.sv.j2"></a>
## sv/pmcsr_stub.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `clk_hz` | yes | no | no | src/templating/advanced_sv_power.py, src/templating/sv_context_builder.py, src/utils/unified_context.py |  |
| `enable_pme` | yes | no | no | src/templating/advanced_sv_power.py, src/templating/sv_context_builder.py, src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `timeout_ms` | yes | no | no | src/templating/advanced_sv_power.py, src/utils/unified_context.py |  |
| `tr_ns` | yes | no | no | src/templating/advanced_sv_power.py, src/utils/unified_context.py |  |

</details>


<a id="sv-power_declarations.sv.j2"></a>
## sv/power_declarations.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `enable_pme` | yes | no | no | src/templating/advanced_sv_power.py, src/templating/sv_context_builder.py, src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `enable_wake_events` | yes | no | no | src/templating/advanced_sv_power.py, src/templating/sv_context_builder.py, src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |

</details>


<a id="sv-power_integration.sv.j2"></a>
## sv/power_integration.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `clk_hz` | yes | no | no | src/templating/advanced_sv_power.py, src/templating/sv_context_builder.py, src/utils/unified_context.py |  |
| `enable_pme` | yes | no | no | src/templating/advanced_sv_power.py, src/templating/sv_context_builder.py, src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `enable_wake_events` | yes | no | no | src/templating/advanced_sv_power.py, src/templating/sv_context_builder.py, src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `tr_ns` | yes | no | no | src/templating/advanced_sv_power.py, src/utils/unified_context.py |  |

</details>


<a id="sv-power_management.sv.j2"></a>
## sv/power_management.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `power_management` | yes | no | no | src/device_clone/pcileech_context.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py, src/device_clone/donor_info_template.py, src/templating/systemverilog_generator.py |  |
| `transition_cycles` | yes | no | no | src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py |  |

</details>


<a id="sv-power_transitions.sv.j2"></a>
## sv/power_transitions.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `_td` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt; |  |
| `config` | yes | no | no | src/templating/advanced_sv_features.py, src/templating/advanced_sv_error.py, src/utils/unified_context.py |  |
| `from_state_value` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt; |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `to_state_value` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt; |  |
| `transition_delays` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt;, src/utils/unified_context.py |  |

</details>


<a id="sv-read_logic.sv.j2"></a>
## sv/read_logic.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `device_signature` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, src/utils/metadata.py, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `registers` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_module_generator.py, src/device_clone/variance_manager.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py, src/device_clone/behavior_profiler.py, src/device_clone/pcileech_context.py, src/device_clone/device_config.py, src/templating/tcl_builder.py |  |

</details>


<a id="sv-register_declarations.sv.j2"></a>
## sv/register_declarations.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `device_config` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `device_type` | yes | no | no | src/templating/advanced_sv_perf.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/device_clone/device_config.py, src/templating/systemverilog_generator.py, src/templating/sv_module_generator.py |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `performance_counters` | yes | no | no | src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py, src/device_clone/donor_info_template.py, src/device_clone/pcileech_context.py |  |
| `process_var` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt; |  |
| `registers` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_module_generator.py, src/device_clone/variance_manager.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py, src/device_clone/behavior_profiler.py, src/device_clone/pcileech_context.py, src/device_clone/device_config.py, src/templating/tcl_builder.py |  |
| `temp_coeff` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt; |  |
| `variance_model` | yes | no | no | src/templating/advanced_sv_generator.py, src/utils/unified_context.py, src/device_clone/behavior_profiler.py, src/device_clone/pcileech_context.py, src/device_clone/variance_manager.py, src/templating/sv_module_generator.py |  |
| `varied_value` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt; |  |
| `voltage_var` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt; |  |

</details>


<a id="sv-register_logic.sv.j2"></a>
## sv/register_logic.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `reg_value` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt; |  |
| `registers` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_module_generator.py, src/device_clone/variance_manager.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py, src/device_clone/behavior_profiler.py, src/device_clone/pcileech_context.py, src/device_clone/device_config.py, src/templating/tcl_builder.py |  |
| `variance_model` | yes | no | no | src/templating/advanced_sv_generator.py, src/utils/unified_context.py, src/device_clone/behavior_profiler.py, src/device_clone/pcileech_context.py, src/device_clone/variance_manager.py, src/templating/sv_module_generator.py |  |

</details>


<a id="sv-reporting_logic.sv.j2"></a>
## sv/reporting_logic.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `config` | yes | no | no | src/templating/advanced_sv_features.py, src/templating/advanced_sv_error.py, src/utils/unified_context.py |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |

</details>


<a id="sv-sampling_logic.sv.j2"></a>
## sv/sampling_logic.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `config` | yes | no | no | src/templating/advanced_sv_features.py, src/templating/advanced_sv_error.py, src/utils/unified_context.py |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |

</details>


<a id="sv-top_level_wrapper.sv.j2"></a>
## sv/top_level_wrapper.sv.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `active_device_config` | yes | no | no | src/utils/unified_context.py, src/templating/advanced_sv_generator.py, src/templating/systemverilog_generator.py, src/device_clone/pcileech_context.py |  |
| `config_space` | yes | no | no | src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `device` | yes | no | no | src/templating/tcl_builder.py, src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/templating/systemverilog_generator.py, src/templating/sv_module_generator.py |  |
| `device_id_int` | yes | no | no | src/device_clone/pcileech_context.py, &lt;template_local&gt;, src/templating/sv_context_builder.py, src/utils/unified_context.py |  |
| `enable_pme` | yes | no | no | src/templating/advanced_sv_power.py, src/templating/sv_context_builder.py, src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `enable_wake_events` | yes | no | no | src/templating/advanced_sv_power.py, src/templating/sv_context_builder.py, src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `expose_pm_sideband` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt; |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `power_management` | yes | no | no | src/device_clone/pcileech_context.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py, src/device_clone/donor_info_template.py, src/templating/systemverilog_generator.py |  |
| `vendor_id_int` | yes | no | no | src/device_clone/pcileech_context.py, &lt;template_local&gt;, src/templating/sv_context_builder.py, src/utils/unified_context.py |  |

</details>


<a id="tcl-bitstream.j2"></a>
## tcl/bitstream.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |

</details>


<a id="tcl-constraints.j2"></a>
## tcl/constraints.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `board` | yes | no | no | src/device_clone/pcileech_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `board_xdc_content` | yes | yes | no | src/device_clone/pcileech_generator.py, &lt;fallback_manager&gt;, src/templating/template_context_validator.py, src/device_clone/fallback_manager.py, src/templating/tcl_builder.py |  |
| `device` | yes | no | no | src/templating/tcl_builder.py, src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/templating/systemverilog_generator.py, src/templating/sv_module_generator.py |  |
| `generated_xdc_path` | yes | yes | no | src/device_clone/pcileech_generator.py, &lt;fallback_manager&gt;, src/templating/template_context_validator.py, src/utils/unified_context.py, src/device_clone/fallback_manager.py, src/templating/tcl_builder.py |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `sys_clk_freq_mhz` | yes | yes | yes | src/device_clone/pcileech_generator.py, &lt;fallback_manager&gt;, src/utils/unified_context.py, src/device_clone/fallback_manager.py, src/templating/tcl_builder.py | 100 |

</details>


<a id="tcl-device_setup.j2"></a>
## tcl/device_setup.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `board` | yes | no | no | src/device_clone/pcileech_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `class_code` | yes | no | no | src/device_clone/pcileech_context.py, src/build.py, src/device_clone/pcileech_generator.py, src/device_clone/config_space_manager.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, src/templating/sv_validator.py, src/device_clone/donor_info_template.py, src/device_clone/device_info_lookup.py, src/device_clone/device_config.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `device_id` | yes | no | no | src/device_clone/pcileech_context.py, src/utils/context_driver_enrichment.py, src/build.py, src/device_clone/pcileech_generator.py, src/device_clone/manufacturing_variance.py, src/device_clone/config_space_manager.py, src/device_clone/device_config.py, src/templating/sv_context_builder.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/donor_info_template.py, src/device_clone/device_info_lookup.py, src/device_clone/variance_manager.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `fpga_part` | yes | no | no | src/device_clone/pcileech_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/device_clone/board_config.py, src/templating/tcl_builder.py |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `pcie_config` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt;, src/utils/unified_context.py |  |
| `project_name` | yes | no | no | src/templating/tcl_builder.py, src/utils/unified_context.py |  |
| `vendor_id` | yes | no | no | src/device_clone/pcileech_context.py, src/utils/context_driver_enrichment.py, src/build.py, src/device_clone/pcileech_generator.py, src/device_clone/config_space_manager.py, src/templating/sv_context_builder.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/donor_info_template.py, src/device_clone/device_info_lookup.py, src/device_clone/device_config.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |

</details>


<a id="tcl-header.j2"></a>
## tcl/header.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `board` | yes | no | no | src/device_clone/pcileech_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `device` | yes | no | no | src/templating/tcl_builder.py, src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/templating/systemverilog_generator.py, src/templating/sv_module_generator.py |  |
| `meta` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt;, src/utils/unified_context.py |  |
| `title` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt;, src/utils/unified_context.py |  |

</details>


<a id="tcl-implementation.j2"></a>
## tcl/implementation.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |

</details>


<a id="tcl-ip_config.j2"></a>
## tcl/ip_config.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `board` | yes | no | no | src/device_clone/pcileech_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `device` | yes | no | no | src/templating/tcl_builder.py, src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/templating/systemverilog_generator.py, src/templating/sv_module_generator.py |  |
| `device_config` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |

</details>


<a id="tcl-ip_config_axi_pcie.j2"></a>
## tcl/ip_config_axi_pcie.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `board` | yes | no | no | src/device_clone/pcileech_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `device` | yes | no | no | src/templating/tcl_builder.py, src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/templating/systemverilog_generator.py, src/templating/sv_module_generator.py |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |

</details>


<a id="tcl-ip_config_pcie7x.j2"></a>
## tcl/ip_config_pcie7x.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `board` | yes | no | no | src/device_clone/pcileech_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `config_space` | yes | no | no | src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `device` | yes | no | no | src/templating/tcl_builder.py, src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/templating/systemverilog_generator.py, src/templating/sv_module_generator.py |  |
| `device_config` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `device_id_int` | yes | no | no | src/device_clone/pcileech_context.py, &lt;template_local&gt;, src/templating/sv_context_builder.py, src/utils/unified_context.py |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `vendor_id_int` | yes | no | no | src/device_clone/pcileech_context.py, &lt;template_local&gt;, src/templating/sv_context_builder.py, src/utils/unified_context.py |  |

</details>


<a id="tcl-ip_config_ultrascale.j2"></a>
## tcl/ip_config_ultrascale.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `board` | yes | no | no | src/device_clone/pcileech_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `config_space` | yes | no | no | src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `device` | yes | no | no | src/templating/tcl_builder.py, src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/templating/systemverilog_generator.py, src/templating/sv_module_generator.py |  |
| `device_config` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `device_id_int` | yes | no | no | src/device_clone/pcileech_context.py, &lt;template_local&gt;, src/templating/sv_context_builder.py, src/utils/unified_context.py |  |
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `vendor_id_int` | yes | no | no | src/device_clone/pcileech_context.py, &lt;template_local&gt;, src/templating/sv_context_builder.py, src/utils/unified_context.py |  |

</details>


<a id="tcl-master_build.j2"></a>
## tcl/master_build.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `board` | yes | no | no | src/device_clone/pcileech_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `config_space` | yes | no | no | src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `device` | yes | no | no | src/templating/tcl_builder.py, src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/templating/systemverilog_generator.py, src/templating/sv_module_generator.py |  |
| `device_config` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `device_id_int` | yes | no | no | src/device_clone/pcileech_context.py, &lt;template_local&gt;, src/templating/sv_context_builder.py, src/utils/unified_context.py |  |
| `header_comment` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/tcl_builder.py, src/utils/unified_context.py |  |
| `vendor_id_int` | yes | no | no | src/device_clone/pcileech_context.py, &lt;template_local&gt;, src/templating/sv_context_builder.py, src/utils/unified_context.py |  |

</details>


<a id="tcl-pcileech_build.j2"></a>
## tcl/pcileech_build.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `batch_mode` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/tcl_builder.py, src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `board` | yes | no | no | src/device_clone/pcileech_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `board_name` | yes | no | no | src/templating/tcl_builder.py, src/utils/unified_context.py |  |
| `build` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/tcl_builder.py, src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `fpga_family` | yes | no | yes | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, src/device_clone/board_config.py, src/templating/tcl_builder.py |  |
| `fpga_part` | yes | no | no | src/device_clone/pcileech_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/device_clone/board_config.py, src/templating/tcl_builder.py |  |
| `header_comment` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/tcl_builder.py, src/utils/unified_context.py |  |
| `implementation_strategy` | yes | no | yes | src/device_clone/pcileech_generator.py, src/templating/tcl_builder.py, src/utils/unified_context.py |  |
| `kwargs` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt; |  |
| `project` | yes | no | no | src/utils/unified_context.py, src/device_clone/pcileech_generator.py, src/templating/tcl_builder.py, src/device_clone/pcileech_context.py |  |
| `project_dir` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/tcl_builder.py, src/utils/unified_context.py |  |
| `synthesis_strategy` | yes | no | yes | src/device_clone/pcileech_generator.py, src/templating/tcl_builder.py, src/utils/unified_context.py |  |

</details>


<a id="tcl-pcileech_constraints.j2"></a>
## tcl/pcileech_constraints.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `board` | yes | no | no | src/device_clone/pcileech_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `device` | yes | no | no | src/templating/tcl_builder.py, src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/templating/systemverilog_generator.py, src/templating/sv_module_generator.py |  |
| `header_comment` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/tcl_builder.py, src/utils/unified_context.py |  |
| `max_lanes` | yes | yes | no | src/device_clone/pcileech_generator.py, &lt;fallback_manager&gt;, src/templating/template_context_validator.py, src/utils/unified_context.py, src/device_clone/fallback_manager.py, src/templating/tcl_builder.py |  |
| `num_lanes` | yes | no | no | &lt;template_local&gt; |  |
| `pcie_clk_n_pin` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt; |  |
| `pcie_clk_p_pin` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt; |  |
| `pcie_rst_pin` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt;, src/utils/unified_context.py |  |
| `supports_msix` | yes | yes | no | src/device_clone/pcileech_generator.py, &lt;fallback_manager&gt;, src/templating/template_context_validator.py, src/utils/unified_context.py, src/device_clone/fallback_manager.py, src/device_clone/donor_info_template.py, src/device_clone/device_config.py, src/templating/tcl_builder.py |  |

</details>


<a id="tcl-pcileech_generate_project.j2"></a>
## tcl/pcileech_generate_project.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `board_name` | yes | no | no | src/templating/tcl_builder.py, src/utils/unified_context.py |  |
| `config_space` | yes | no | no | src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `constraint_files` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/template_context_validator.py, src/templating/tcl_builder.py, src/utils/unified_context.py |  |
| `device` | yes | no | no | src/templating/tcl_builder.py, src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/templating/systemverilog_generator.py, src/templating/sv_module_generator.py |  |
| `device_config` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/systemverilog_generator.py, src/templating/tcl_builder.py |  |
| `device_id_int` | yes | no | no | src/device_clone/pcileech_context.py, &lt;template_local&gt;, src/templating/sv_context_builder.py, src/utils/unified_context.py |  |
| `fpga_family` | yes | no | yes | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, src/device_clone/board_config.py, src/templating/tcl_builder.py |  |
| `fpga_part` | yes | no | no | src/device_clone/pcileech_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/device_clone/board_config.py, src/templating/tcl_builder.py |  |
| `header_comment` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/tcl_builder.py, src/utils/unified_context.py |  |
| `max_lanes` | yes | yes | no | src/device_clone/pcileech_generator.py, &lt;fallback_manager&gt;, src/templating/template_context_validator.py, src/utils/unified_context.py, src/device_clone/fallback_manager.py, src/templating/tcl_builder.py |  |
| `pcie_ip_type` | yes | no | no | src/device_clone/board_config.py, src/device_clone/pcileech_generator.py, src/templating/tcl_builder.py, src/utils/unified_context.py |  |
| `pcileech` | yes | no | no | src/templating/tcl_builder.py, src/utils/unified_context.py |  |
| `project_dir` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/tcl_builder.py, src/utils/unified_context.py |  |
| `project_name` | yes | no | no | src/templating/tcl_builder.py, src/utils/unified_context.py |  |
| `supports_msi` | yes | yes | no | src/device_clone/pcileech_generator.py, &lt;fallback_manager&gt;, src/templating/template_context_validator.py, src/utils/unified_context.py, src/device_clone/fallback_manager.py, src/device_clone/donor_info_template.py, src/device_clone/device_config.py, src/templating/tcl_builder.py |  |
| `supports_msix` | yes | yes | no | src/device_clone/pcileech_generator.py, &lt;fallback_manager&gt;, src/templating/template_context_validator.py, src/utils/unified_context.py, src/device_clone/fallback_manager.py, src/device_clone/donor_info_template.py, src/device_clone/device_config.py, src/templating/tcl_builder.py |  |
| `vendor_id_int` | yes | no | no | src/device_clone/pcileech_context.py, &lt;template_local&gt;, src/templating/sv_context_builder.py, src/utils/unified_context.py |  |

</details>


<a id="tcl-pcileech_implementation.j2"></a>
## tcl/pcileech_implementation.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `board` | yes | no | no | src/device_clone/pcileech_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `build` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/tcl_builder.py, src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `device` | yes | no | no | src/templating/tcl_builder.py, src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/templating/systemverilog_generator.py, src/templating/sv_module_generator.py |  |
| `enable_incremental` | yes | no | no | src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `enable_power_opt` | yes | no | no | src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `header_comment` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/tcl_builder.py, src/utils/unified_context.py |  |
| `implementation_strategy` | yes | no | yes | src/device_clone/pcileech_generator.py, src/templating/tcl_builder.py, src/utils/unified_context.py |  |
| `opt_directive` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt; |  |
| `pcie_ip_type` | yes | no | no | src/device_clone/board_config.py, src/device_clone/pcileech_generator.py, src/templating/tcl_builder.py, src/utils/unified_context.py |  |
| `phys_opt_directive` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt; |  |
| `place_directive` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt; |  |
| `route_directive` | yes | yes | no | src/device_clone/fallback_manager.py, &lt;fallback_manager&gt; |  |
| `supports_msix` | yes | yes | no | src/device_clone/pcileech_generator.py, &lt;fallback_manager&gt;, src/templating/template_context_validator.py, src/utils/unified_context.py, src/device_clone/fallback_manager.py, src/device_clone/donor_info_template.py, src/device_clone/device_config.py, src/templating/tcl_builder.py |  |

</details>


<a id="tcl-pcileech_project_setup.j2"></a>
## tcl/pcileech_project_setup.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `board` | yes | no | no | src/device_clone/pcileech_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `build` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/tcl_builder.py, src/templating/template_context_validator.py, src/utils/unified_context.py |  |
| `device` | yes | no | no | src/templating/tcl_builder.py, src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/templating/systemverilog_generator.py, src/templating/sv_module_generator.py |  |
| `header_comment` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/tcl_builder.py, src/utils/unified_context.py |  |
| `implementation_strategy` | yes | no | yes | src/device_clone/pcileech_generator.py, src/templating/tcl_builder.py, src/utils/unified_context.py |  |
| `max_lanes` | yes | yes | no | src/device_clone/pcileech_generator.py, &lt;fallback_manager&gt;, src/templating/template_context_validator.py, src/utils/unified_context.py, src/device_clone/fallback_manager.py, src/templating/tcl_builder.py |  |
| `pcileech` | yes | no | no | src/templating/tcl_builder.py, src/utils/unified_context.py |  |
| `project` | yes | no | no | src/utils/unified_context.py, src/device_clone/pcileech_generator.py, src/templating/tcl_builder.py, src/device_clone/pcileech_context.py |  |
| `project_dir` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/tcl_builder.py, src/utils/unified_context.py |  |
| `synthesis_strategy` | yes | no | yes | src/device_clone/pcileech_generator.py, src/templating/tcl_builder.py, src/utils/unified_context.py |  |

</details>


<a id="tcl-pcileech_sources.j2"></a>
## tcl/pcileech_sources.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `board` | yes | no | no | src/device_clone/pcileech_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `header_comment` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/tcl_builder.py, src/utils/unified_context.py |  |
| `pcileech` | yes | no | no | src/templating/tcl_builder.py, src/utils/unified_context.py |  |
| `top_module` | yes | no | no | src/templating/template_context_validator.py, src/utils/unified_context.py |  |

</details>


<a id="tcl-project_setup.j2"></a>
## tcl/project_setup.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `board` | yes | no | no | src/device_clone/pcileech_generator.py, src/utils/unified_context.py, &lt;template_local&gt;, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |
| `device` | yes | no | no | src/templating/tcl_builder.py, src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/utils/unified_context.py, &lt;template_local&gt;, src/templating/systemverilog_generator.py, src/templating/sv_module_generator.py |  |
| `header_comment` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/tcl_builder.py, src/utils/unified_context.py |  |
| `output_dir` | yes | no | no | src/templating/tcl_builder.py |  |
| `project` | yes | no | no | src/utils/unified_context.py, src/device_clone/pcileech_generator.py, src/templating/tcl_builder.py, src/device_clone/pcileech_context.py |  |
| `project_dir` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/tcl_builder.py, src/utils/unified_context.py |  |

</details>


<a id="tcl-sources.j2"></a>
## tcl/sources.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |

</details>


<a id="tcl-synthesis.j2"></a>
## tcl/synthesis.j2

<details>
<summary>Show variables</summary>

| Name | Safe | Fallback | Default in Template | Defined In | Unsafe Defaults |
|------|------|----------|---------------------|------------|------------------|
| `header` | yes | no | no | src/device_clone/pcileech_generator.py, src/templating/sv_context_builder.py, src/templating/advanced_sv_generator.py, src/templating/sv_module_generator.py, src/utils/unified_context.py, src/device_clone/pcileech_context.py, src/templating/tcl_builder.py |  |

</details>


---
Note: This page is auto-generated. To update, run `python3 scripts/gen_template_reference.py`.
