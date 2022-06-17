using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraFollow : MonoBehaviour
{
    public Transform Player;
    public float SmoothSpeed = 0.125f;
    public Vector3 offset;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void FixedUpdate()
    {
        
        Vector3 desiredPositon = Player.position    + offset;
        Vector3 smoothedPosition = Vector3.Lerp(transform.position, desiredPositon, SmoothSpeed);
        transform.position = new Vector3(smoothedPosition.x+offset.x, offset.y, offset.z);

        //transform.LookAt(Player);
    }

}
