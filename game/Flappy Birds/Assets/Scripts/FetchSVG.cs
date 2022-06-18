using System.Collections;
using System.Collections.Generic;
using System.IO;
using Unity.VectorGraphics;
using UnityEngine;
using UnityEngine.Networking;

public class FetchSVG : MonoBehaviour
{
    public const string svgurl = "https://ipfs.moralis.io/ipfs/QmPff5TPQ6xfvYhThDHw46dkamhqZkiKuwnp2gzBpNgLVu";
    //public SVGImage svgimg;
    public SpriteRenderer flappySVG;
    // Start is called before the first frame update
    void Start()
    {
        StartCoroutine(Download());
    }

    // Update is called once per frame
    void Update()
    {

    }

    // load svg asset from a path and assign it to a renderer in the game object (this)

    private IEnumerator Download()
    {
        //public SVGImage svgimg;
        UnityWebRequest www = UnityWebRequest.Get(svgurl);
        yield return www.SendWebRequest();
        if (www.isHttpError || www.isNetworkError)
        {
            Debug.Log("Error while Receiving: " + www.error);
        }
        else
        {
            //Convert byte[] data of svg into string
            string bitString = System.Text.Encoding.UTF8.GetString(www.downloadHandler.data);
            var tessOptions = new VectorUtils.TessellationOptions()
            {
                StepDistance = 100.0f,
                MaxCordDeviation = 0.5f,
                MaxTanAngleDeviation = 0.1f,
                SamplingStepSize = 0.01f
            };
            var sceneInfo = SVGParser.ImportSVG(new StringReader(bitString));
            var geoms = VectorUtils.TessellateScene(sceneInfo.Scene, tessOptions);

            // Build a sprite with the tessellated geometry
            Sprite sprite = VectorUtils.BuildSprite(geoms, 10.0f, VectorUtils.Alignment.Center, Vector2.zero, 128, true);
            //svgimg.sprite = sprite;
            GetComponent<SpriteRenderer>().sprite = sprite;
            flappySVG.transform.localScale = new Vector3(.25f, .25f, .25f);
            //GetComponent<SpriteRenderer>().enabled = true; // incase we dont want the gliching between default and the new svg
            GetComponent<SpriteRenderer>().GetComponentInParent<Rigidbody>().useGravity = enabled;
        }
    }

}


//credits💚: https://forum.unity.com/threads/how-to-load-svg-from-url.607423/