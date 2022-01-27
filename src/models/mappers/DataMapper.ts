import { ConversionType } from "../GraphQl/OutputTypes/ConversionType";
import { UxConversionType } from "../data/Impl/UxConversionType";
import { UxPodEmail } from "../data/Impl/UxPodEmail";
import { UxPod } from "../data/Impl/UxPod";
import { Pod } from "../GraphQl/OutputTypes/Pod";

export class DataMapper {
  mapUxPodToPod(uxPod: UxPod, uxPodEmail?: UxPodEmail): Pod {
    return {
      podId: uxPod.ux_pod_id,
      podName: uxPod.pod_name,
      podUrl: uxPod.pod_url,
      podEmailDomainId: uxPod.uxp_ux_pod_email_id,
      podEmailDomain: uxPodEmail ? uxPodEmail.email_domain : null,
    };
  }
  mapPodToUxPod(pod: Pod): UxPod {
    return {
      ux_pod_id: pod.podId,
      pod_name: pod.podName,
      pod_url: pod.podUrl,
      uxp_ux_pod_email_id: pod.podEmailDomainId,
    };
  }

  mapUxConvTypeToConvType(uxConvType: UxConversionType): ConversionType {
    return {
      convTypeId: uxConvType.ux_conversion_type_id,
      convTypeName: uxConvType.conversion_type_name,
    };
  }
  mapConvTypeToUxConvType(convType: ConversionType): UxConversionType {
    const mapped = {
      ux_conversion_type_id: convType.convTypeId,
      conversion_type_name: convType.convTypeName,
    };
    return mapped;
  }
}
